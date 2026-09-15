// पंचमुखी रुद्राक्ष कॉन्फ़िगरेशन (Panchmukhi Rudraksha Configuration)
// ऐप पब्लिक होने के बाद आप जो लिंक देंगे, वह नीचे targetUrl में लग जाएगा।

export interface RudrakshaImageOption {
  id: string;
  label: string;
  url: string;
  description: string;
}

export interface RudrakshaConfig {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  image: string;
  imageOptions: RudrakshaImageOption[];
  ctaText: string;
  // जब आप लिंक देंगे, बस targetUrl में पेस्ट कर दें (जैसे: 'https://yourstore.com/panchmukhi-rudraksha')
  targetUrl: string;
}

export const RUDRAKSHA_CONFIG: RudrakshaConfig = {
  title: 'सिद्ध पंचमुखी रुद्राक्ष (Certified Panchmukhi Rudraksha)',
  subtitle: 'हरिद्वार व काशी विश्वनाथ में अभिमंत्रित • 100% लैब-प्रमाणित',
  badge: 'सात्विक व सिद्ध • प्रामाणिक',
  description: 'मानसिक शांति, सकारात्मक ऊर्जा, आत्मबल व एकाग्रता हेतु शुद्ध पंचमुखी रुद्राक्ष। कोई विज्ञापन नहीं, सीधे अभिमंत्रित रुद्राक्ष सेवा।',
  image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Rudraksha_Bead.jpg',
  imageOptions: [
    {
      id: 'bead-1',
      label: 'सिद्ध पंचमुखी दाना (5-Mukhi Bead)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Rudraksha_Bead.jpg',
      description: 'प्राकृतिक नेपाली पंचमुखी रुद्राक्ष दाना, स्पष्ट 5 रेखाएं व प्राकृतिक उभार',
    },
    {
      id: 'mala-1',
      label: 'सिद्ध रुद्राक्ष माला (Japa Mala)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/RudrakshaBeads.jpg',
      description: '108 मनकों वाली अभिमंत्रित साधना व जाप रुद्राक्ष माला',
    },
    {
      id: 'kashi-1',
      label: 'काशी विश्वनाथ प्रतिष्ठित (Sanctified)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Rudrahouse.jpg',
      description: 'पवित्र तीर्थ स्थल में गंगाजल व मंत्रों से प्राण-प्रतिष्ठित रुद्राक्ष',
    },
    {
      id: 'natural-1',
      label: 'प्राकृतिक हिमालयी रुद्राक्ष (Himalayan)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Elaeocarpus_ganitrus.jpg',
      description: 'हिमालयी पर्वत श्रेणियों से प्राप्त 100% शुद्ध एलायोकार्पस गैनिट्रस बीज',
    },
  ],
  ctaText: 'रुद्राक्ष प्राप्त करें →',
  // ऐप पब्लिक होने के बाद दिया जाने वाला लिंक यहाँ लगेगा:
  targetUrl: '', 
};

