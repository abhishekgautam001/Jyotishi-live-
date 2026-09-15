import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instruction enforcing user's strict positivity requirement:
// "client ko darana dhamkna bilkul nahi hai hamesha positive bate hi honi hai... AI hamesha positive solutions aur aasan upaay (jaise subah surya ko jal dena ya dhyan lagana) bataye"
const PANDIT_JI_SYSTEM_PROMPT = `Aap "Jyotishi Live" ke param aadaraniya, vidvan aur prem-purna "Virtual Pandit Ji" hain.
Aapka uddeshya har vyakti ko aashirwaad, sakaratmakta (pure positivity), aatmavishwas aur shanti pradan karna hai.

KATHOR NIYAM (STRICT RULES):
1. BILKUL BHI DARANA YA DHAMKANA NAHI HAI: Kabhi bhi aisi baatein na kahein jaise "anarth hone wala hai", "badi musibat aayegi", "shani dev ka krodh tabahi karega", "tumhara vinash hoga", ya koi bhi bhay-bhit karne wali baat. Aisi bhasha sarvatha varjit hai.
2. SAKARATMAK DRISHTIKON (POSITIVE REFRAMING): Yadi user Rahu, Ketu, Shani Sade Sati ya Manglik dosh ke bare mein pooche, to unhe dharasheel, aatm-sudhar, dhairya aur aage badhne ka shubh avsar batayein. Batayein ki grah hume seekh aur nikharna sikhate hain, darana nahi.
3. SARAL AUR SUNDAR UPAAY (SIMPLE SATVIK REMEDIES): Hamesha aasan, pavitra aur bina kisi mehenge karmakand ke satvik upaay batayein, jaise:
   - Subah surya uday ke samay tambe ke lote se Suryadev ko arghya (jal) arpit karna.
   - 10-15 minute shanti se baith kar dhyan (meditation) aur deep breathing karna.
   - Gayatri Mantra ya "Om Namah Shivaya" ka 11 ya 108 baar pavitra man se jaap karna.
   - Tulsi ji ko jal dena aur shaam ko dipak jalana.
   - Pakshiyon ko daana aur pashuon ko roti dena (Daan aur Karuna).
   - Mata-pita aur guruon ke charan sparsh karke aashirwaad lena.
   - Man mein vishwas aur satya vachan rakhna.
4. BHASHA SHAYLI: Aadar-saman se bhari madhur Hindi/Hinglish bhasha me kripalu aashirwaad ke saath baat karein. Sambodhan mein "Beta", "Shreshth Ji", ya "Priye Mitr" jaise aadar soochak shabd use karein.
5. ENDING BLESSING: Hamesha antt me "Sada Kalyan Ho! Om Shanti!" ya "Vijayee Bhava, Sada Mangal Ho!" jaisa shubh aashirwaad dein.`;

// Robust multi-model generator with automatic retry and fallback on 503/429 high demand spikes
async function generateGeminiContentWithFallback(
  ai: GoogleGenAI,
  options: {
    prompt: string;
    systemInstruction: string;
    temperature?: number;
  }
): Promise<string | null> {
  const candidateModels = [
    'gemini-3.8-flash',
    'gemini-3.1-flash-lite',
    'gemini-flash-latest',
  ];

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: options.prompt,
        config: {
          systemInstruction: options.systemInstruction,
          temperature: options.temperature ?? 0.7,
        },
      });

      const text = response?.text?.trim();
      if (text) {
        return text;
      }
    } catch (err: any) {
      const msg = String(err?.message || err || '');
      const isTemporary =
        err?.status === 503 ||
        msg.includes('503') ||
        msg.includes('high demand') ||
        msg.includes('UNAVAILABLE') ||
        err?.status === 429 ||
        msg.includes('429');

      if (isTemporary) {
        // High demand spike - wait briefly and attempt fallback model without dumping raw error stack
        await new Promise((resolve) => setTimeout(resolve, 350));
        continue;
      } else {
        // Non-temporary model issue - proceed to candidate model
        continue;
      }
    }
  }

  return null;
}

// AI Pandit Ji Chat Endpoint
app.post('/api/ai-pandit/chat', async (req, res) => {
  const { message, history = [], userProfile, languageMode = 'hinglish' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const isPureHindi = languageMode === 'hindi';
  const ai = getGenAI();

  // If Gemini client is available, run generateContent with strict positive systemInstruction
  if (ai) {
    let profileContext = '';
    if (userProfile?.name) {
      profileContext = `User Info: Name: ${userProfile.name}, DOB: ${userProfile.dob || 'Not provided'}, Time: ${userProfile.tob || 'Not provided'}, Place: ${userProfile.pob || 'Not provided'}, Rashi: ${userProfile.rashi || 'Not provided'}.\n`;
    }

    // Format brief history for context
    const formattedHistory = history
      .slice(-6)
      .map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Yajman' : 'Pandit Ji'}: ${h.text}`)
      .join('\n');

    const languageInstruction = isPureHindi
      ? 'BHASHA: Shuddh, saral evam madhur Devanagari Hindi me spasht boleinge. Bolkar sunne ke liye upyukt bolchal ki shaili ho.'
      : 'LANGUAGE: Conversational, friendly Hinglish (Hindi written in English alphabet/Roman script) easy to speak and listen aloud.';

    const fullPrompt = `${profileContext}Pichhli baat-cheet:\n${formattedHistory}\n\nYajman ka sawal: "${message}"\n\nNirdesh:\n- ${languageInstruction}\n- Pandit Ji, kripya sakaratmak, aadar-sahit aur pavitra aasan upaay (surya arghya, dhyan, pakshi seva) ke saath margdarshan dein:`;

    const generatedText = await generateGeminiContentWithFallback(ai, {
      prompt: fullPrompt,
      systemInstruction: PANDIT_JI_SYSTEM_PROMPT,
      temperature: 0.7,
    });

    if (generatedText) {
      return res.json({ reply: generatedText, isAi: true, languageMode });
    }
  }

  // Graceful offline positive Vedic fallback if API key not present or error occurs
  const positiveFallbackHindi = [
    `शुभ आशीर्वाद! आपका प्रश्न सुनकर मन प्रसन्न हुआ। ज्योतिष शास्त्र कहता है कि हर चुनौती मनुष्य को और अधिक प्रखर व आत्मविश्वासी बनाने आती है। आपकी कुंडली में ग्रह-स्थिति अनुकूल दिशा की ओर बढ़ रही है।

✨ आपके लिए ३ सरल व सात्विक नियम:
१. प्रातःकाल सूर्यदेव को तांबे के लोटे से जल अर्पित करें और मन ही मन सूर्य गायत्री का ध्यान करें।
२. प्रतिदिन १० मिनट शांत बैठकर ध्यान (Meditation) लगाएं, इससे आत्मबल जागेगा।
३. बेजुबान पक्षियों को दाना और गाय को रोटी अर्पित करें।

आपके जीवन में सकारात्मक परिवर्तन आना निश्चित है। सदा मंगल हो! 🕉️`,

    `प्रणाम प्रियजन! मन में किसी भी प्रकार का भय या चिंता न रखें। ईश्वर ने आपको अपार क्षमता दी है। जो भी स्थिति आप अनुभव कर रहे हैं, वह आपको आगे आने वाली बड़ी सफलता के लिए तैयार कर रही है।

🌸 सरल सात्विक उपाय:
• सुबह तुलसी जी के पास बैठकर "ॐ नमः शिवाय" का ११ बार जाप करें।
• हर सुबह एक सकारात्मक संकल्प लें कि "आज का दिन शुभ और उन्नति दायक है"।
• ध्यान और योग को अपनी दिनचर्या का अंग बनाएं।

आपकी सुख-शांति सदा बनी रहेगी। बहुत-बहुत आशीर्वाद! ✨`,

    `सदा कल्याण हो! आपके ग्रह-नक्षत्र आपको साहस और विवेक का आशीर्वाद दे रहे हैं। कोई भी समस्या ऐसी नहीं जिसका समाधान धैर्य और सत्कर्म से न हो सके।

☀️ दैनिक सात्विक नियम:
१. सुबह सूर्य नमस्कार करें या ध्यान लगाएं, इससे आपका तेज (Aura) प्रखर बनता है।
२. माता-पिता के चरण स्पर्श कर उनका आशीर्वाद लें।
३. जल में थोड़ा गंगाजल या तुलसी पत्र डालकर आचमन करें।

विजयी भव! ईश्वर आपके साथ हैं। 🕉️`
  ];

  const positiveFallbackHinglish = [
    `Namaskar beta! Aapka prashna sunkar prashannata hui. Jyotish shastra kehta hai ki har sankat aane se pehle Bhagwan sadbuddhi aur bal pradan karte hain. 
Aapke kundali grah-sthiti anukul disha ki or aage badh rahi hai. 

✨ Aapke liye 3 saral aur pavitra upaay:
1. Pratahkaal Suryadev ko tambe ke lote se thoda sa jal arghya dein aur man hi man Surya Gayatri ka dhyan karein.
2. Pratidin 10 minute shant baithkar dhyan (meditation) karein, isse man me aatmavishwas jagrut hoga.
3. Kisi bejubaan pashu ya pakshi ko bhojan ya daana arpit karein.

Aapke jeevan me sakaratmak parivartan aana nishchit hai. Sada Mangal Ho! 🕉️`,

    `Pranaam Priye! Kabhi bhi chinta na karein. Ishwar ne aapko apar kshamta di hai. Jo bhi sthiti aap abhi anubhav kar rahe hain, vah aapko aage aane wali badi safalta ke liye taiyar kar rahi hai.

🌸 Aasan Upaay:
• Subah Tulsi ji ke paas shant baithkar "Om Namah Shivaya" ka 11 baar jaap karein.
• Har subah ek sakaratmak sankalp lein ki "Aaj ka din shubh aur unnati dayak hai".
• Dhyan aur yoga ko apni dincharya ka hissa banayein.

Aapki shanti aur samriddhi sada bani rahegi. Aashirwaad! ✨`,

    `Subh aashirwaad! Aapke grah-nakshatra aapko saahas aur vivek ka aashirwaad de rahe hain. Koi bhi samasya aisi nahi jiska samadhan dhairya aur satkarma se na ho sake.

☀️ Aasan Niyam:
1. Subah Surya namaskar ya dhyan lagayein, isse aapki urja (aura) tejasvi banti hai.
2. Mata-pita ke charan sparsh karke unka ashirwad lein.
3. Jal me thoda gangajal ya tulsi patta dalkar aachman karein.

Vijayee Bhava! Ishwar aapke sath hain. 🕉️`
  ];

  const targetList = isPureHindi ? positiveFallbackHindi : positiveFallbackHinglish;
  const randomFallback = targetList[Math.floor(Math.random() * targetList.length)];
  return res.json({ reply: randomFallback, isAi: false, languageMode });
});

// Personalized Vedic Kundali Generation Endpoint
app.post('/api/kundali/generate', async (req, res) => {
  const { name, dob, tob, pob, gender, rashi } = req.body;

  if (!name || !dob) {
    return res.status(400).json({ error: 'Name and Date of Birth are required' });
  }

  const ai = getGenAI();

  // Planetary Calculation baseline
  const rashiList = ['Mesh (Aries)', 'Vrishabh (Taurus)', 'Mithun (Gemini)', 'Kark (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchik (Scorpio)', 'Dhanu (Sagittarius)', 'Makar (Capricorn)', 'Kumbh (Aquarius)', 'Meen (Pisces)'];
  const nakshatras = ['Ashwini', 'Rohini', 'Mrigashira', 'Pushya', 'Magha', 'Uttara Phalguni', 'Chitra', 'Swati', 'Anuradha', 'Mula', 'Uttara Ashadha', 'Shravana', 'Shatabhisha', 'Revati'];

  // Seeded deterministic generation based on name & dob
  const seedNum = (name.length * 7 + new Date(dob).getDate() * 13 + (tob ? parseInt(tob.replace(':', '')) || 5 : 11)) % 12;
  const determinedRashi = rashi || rashiList[seedNum];
  const determinedNakshatra = nakshatras[seedNum % nakshatras.length];

  let aiAnalysis = '';
  if (ai) {
    const prompt = `User name: ${name}, DOB: ${dob}, TOB: ${tob || 'Morning'}, POB: ${pob || 'India'}, Rashi: ${determinedRashi}, Nakshatra: ${determinedNakshatra}.
Kripya is vyakti ki Kundali ke liye ek bahut sundar, prerna-dayak aur shubh vishleshan likhein.
KATHOR NIYAM:
- Kisi bhi dasha ya yog se darana bilkul nahi hai (strictly no fear, no anarth, no bad luck).
- Kundali me shubh yog (jaise Gajakesari, Budhaditya, Ruchak, Hansa) aur vyakti ki khubiyo ko highlight karein.
- Har chunauti ka ek aasan, satvik upaay batayein (jaise surya ko jal dena, dhyan lagana, pakshiyo ko dana dena).
- Max 250 words me concise aur sakaratmak format me dein.`;

    const generated = await generateGeminiContentWithFallback(ai, {
      prompt,
      systemInstruction: PANDIT_JI_SYSTEM_PROMPT,
      temperature: 0.6,
    });
    aiAnalysis = generated || '';
  }

  if (!aiAnalysis) {
    aiAnalysis = `Aapki Lagna Kundali aur Chandra Rashi ${determinedRashi} ka vishleshan darshata hai ki aapke andar dharana shakti, aatmavishwas aur vinamrata ka anutha sangam hai. 
Aapki kundali me Budhaditya yog aur Guru ki shubh drishti hai, jo aapko shiksha, vyapar ya career me nayi uchaiyan pradan karegi.

Shubh Upaay:
1. Subah Suryadev ko tambe ke patra se arghya dekar din ki shuruat karein.
2. Rozana 10-15 minute dhyan aur Gayatri mantra ka dhyan karein.
3. Pavitra bhavna se pakshiyon ko anaaj dein.
Yeh saral upaay aapke tej aur aatmabal ko koti guna badhayenge.`;
  }

  const kundaliData = {
    name,
    dob,
    tob: tob || '10:30 AM',
    pob: pob || 'New Delhi, India',
    gender: gender || 'Not specified',
    lagna: rashiList[(seedNum + 2) % 12],
    rashi: determinedRashi,
    nakshatra: determinedNakshatra,
    luckyNumber: ((seedNum * 3 + 1) % 9) + 1,
    luckyColor: ['Pavitra Peela (Golden Yellow)', 'Kesariya (Saffron)', 'Shvet (Pearl White)', 'Sinduri Lal (Auspicious Red)'][seedNum % 4],
    luckyDay: ['Guruwar (Thursday)', 'Somwar (Monday)', 'Ravivar (Sunday)', 'Budhwar (Wednesday)'][seedNum % 4],
    luckyGemstone: ['Pukhraj / Manekya (Yellow Sapphire/Ruby)', 'Moti (Natural Pearl)', 'Panna (Emerald)'][seedNum % 3],
    favorableDeity: 'Bhagwan Shiva & Suryadev',
    planets: [
      { name: 'Surya (Sun)', house: '1st House (Lagna)', dignity: 'Uchha / Balwan', status: 'Tejasvi', influence: 'Aatmavishwas & Pratishtha' },
      { name: 'Chandra (Moon)', house: '4th House (Sukha)', dignity: 'Shant & Pavitra', status: 'Shubh', influence: 'Man ki Shanti & Maatru Sukh' },
      { name: 'Guru (Jupiter)', house: '9th House (Bhagya)', dignity: 'Kripalu', status: 'Param Shubh', influence: 'Gyan, Bhagya & Aadhyatmikta' },
      { name: 'Mangal (Mars)', house: '10th House (Karma)', dignity: 'Digbali', status: 'Balwan', influence: 'Ojas, Sahas & Karyakushalata' },
      { name: 'Budh (Mercury)', house: '5th House (Buddhi)', dignity: 'Mitra Sthan', status: 'Shubh', influence: 'Vivek & Vani ki Madhurata' },
      { name: 'Shukra (Venus)', house: '11th House (Laabh)', dignity: 'Anukul', status: 'Prasanna', influence: 'Kala, Saundarya & Samriddhi' },
      { name: 'Shani (Saturn)', house: '6th House (Sadhana)', dignity: 'Nyaypriya', status: 'Dhairya Dayak', influence: 'Karmayoga & Seva Bhav' },
      { name: 'Rahu', house: '3rd House (Parakram)', dignity: 'Shant', status: 'Prernaspad', influence: 'Naye Vichar & Vishisht Upalabdhi' },
      { name: 'Ketu', house: '9th House (Moksha)', dignity: 'Aadhyatmik', status: 'Pavitra', influence: 'Dhyan & Ishwar Bhakti' },
    ],
    remedies: [
      { title: 'Surya Arghya', desc: 'Pratahkaal tambe ke lote se Suryadev ko jal arpit karein. Isse sharir me tejas aur aatmavishwas badhta hai.' },
      { title: 'Dhyan & Pranayam', desc: '10 se 15 minute shant sthan par baithkar dhyan lagayein. Man ki chinta dur hogi.' },
      { title: 'Gayatri Mantra', desc: 'Pavitra man se Gayatri Mantra ka 11 baar jaap karein. Buddhi me prakash jagrut hoga.' },
      { title: 'Jeev Seva / Daan', desc: 'Gau mata ko hara chara ya pakshiyo ko dana dein. Isse sakaratmak urja ka sanchar hota hai.' }
    ],
    aiAnalysis
  };

  return res.json(kundaliData);
});

// Astrologer live consultation reply helper with Hindi and Hinglish support
app.post('/api/consultation/astrologer-reply', async (req, res) => {
  const { astrologerName = 'Astrologer', userMessage = '', languageMode = 'hinglish' } = req.body;
  const isPureHindi = languageMode === 'hindi';

  const ai = getGenAI();
  if (ai && userMessage) {
    const languageInstruction = isPureHindi
      ? 'BHASHA: Shuddh, aadar-sahit, bolchal ke liye saral Devanagari Hindi. Bolkar sunne ke liye bilkul anukul.'
      : 'LANGUAGE: Friendly, reassuring conversational Hinglish (Hindi written in clean Roman alphabet) for audio listening.';

    const prompt = `Aap "Jyotishi Live" ke prasiddha jyotishi ${astrologerName} hain.
Client ka prashna: "${userMessage}"
Nirdesh:
- ${languageInstruction}
- KATHOR NIYAM: Kisi bhi dosh ya grah se darana bilkul manaa hai.
- Hamesha aashirwaad, sakaratmak drishtikon aur saral satvik upaay (surya arghya, 10 min dhyan, tulsi jal ya pakshi seva) dein.
- 2-3 chhote vakyoon me prabhavi aur shubh bolen.`;

    const generated = await generateGeminiContentWithFallback(ai, {
      prompt,
      systemInstruction: PANDIT_JI_SYSTEM_PROMPT,
      temperature: 0.7,
    });

    if (generated) {
      return res.json({ 
        reply: generated, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        languageMode
      });
    }
  }

  const hindiResponses = [
    `हरि ॐ! आपकी जन्म पत्रिका व प्रश्न कुंडली देख रहा हूँ। बृहस्पति एवं सूर्य देव की अनुकूल दृष्टि आप पर बनी हुई है। बिल्कुल चिंता न करें, आने वाले समय में आपके सभी कार्य सफल होंगे। प्रातःकाल सूर्यदेव को तांबे के पात्र से जल अर्पित करें। सदा मंगल हो! 🕉️`,
    `शुभ आशीर्वाद! आपके दशम भाव में शुभ ग्रहों की दृष्टि बन रही है। आपकी मेहनत और सकारात्मक सोच का शीघ्र ही सुंदर फल मिलेगा। प्रतिदिन १० मिनट शांत बैठकर ध्यान लगाएं, आत्मबल में अपार वृद्धि होगी।`,
    `आपकी वाणी और विवेक ही आपकी सबसे बड़ी शक्ति है। जीवन में छोटे-मोटे उतार-चढ़ाव हमें और अधिक परिपक्व बनाने आते हैं। माता-पिता का आशीर्वाद लें और तुलसी जी को नमन करें। ईश्वर आपके साथ हैं! ✨`,
    `प्रणाम! ग्रहों का गोचर संकेत दे रहा है कि आपके जीवन में एक नया और शुभ अध्याय आरंभ हो रहा है। मन को शांत रखें और सकारात्मक कर्म करते रहें। विजय भव! 🕉️`
  ];

  const hinglishResponses = [
    `Hari Om! Aapki prashna kundali dekh raha hoon. Surya aur Guru ki shubh drishti se aane wale mahine aapke liye naye avsar layenge. Bilkul ghabraye nahi, subah Surya ko jal arpit karein aur aatmavishwas rakhein. Sada Mangal Ho! 🕉️`,
    `Aapke 10ve bhav me mangalkari grahon ki anukul drishti ban rahi hai. Jo prayas aap kar rahe hain, uska fal thoda dhairya rakhne par avashya milega. 10 minute shant baithkar dhyan zaroor karein.`,
    `Aapki vani aur vivek aapki sabse badi shakti hai. Chhoti-moti chunautiyan aati hain taaki hum aur majboot banein. Mata-pita ka aashirwad lein aur sakaratmak rahein. Sab mangalmay hoga! ✨`,
    `Pranaam! Ishwar me vishwas rakhein. Aapke grah-nakshatra aapke paksh me hain. Daily Surya Gayatri ka dhyan karein aur aage badhein. Vijayee Bhava! 🕉️`
  ];

  const targetResponses = isPureHindi ? hindiResponses : hinglishResponses;
  const randomReply = targetResponses[Math.floor(Math.random() * targetResponses.length)];
  return res.json({ 
    reply: randomReply, 
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    languageMode
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), app: 'Jyotishi Live' });
});

// Start Server and mount Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Jyotishi Live server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
