import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ScrollText, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  Briefcase, 
  Sun, 
  Moon, 
  Flame, 
  Compass 
} from 'lucide-react';
import { AstrologyReport, UserProfile } from '../types';

interface ReportViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AstrologyReport | null;
  userProfile: UserProfile;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({
  isOpen,
  onClose,
  report,
  userProfile,
}) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border border-amber-200/80 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
              <ScrollText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-400/20 px-2 py-0.5 rounded text-amber-200">
                Official Vedic Astrological Report
              </span>
              <h3 className="font-semibold text-base sm:text-lg font-['Cinzel',serif]">
                {report.hindiTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* User Details Watermark Strip */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 font-medium">यजमान (Native):</span>{' '}
              <strong className="text-slate-900 font-['Cinzel',serif]">{userProfile.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">जन्म विवरण:</span>{' '}
              <span className="text-slate-800">{userProfile.dob} • {userProfile.tob}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">राशि:</span>{' '}
              <span className="text-amber-900 font-bold">{userProfile.rashi}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">जन्म स्थान:</span>{' '}
              <span className="text-slate-800">{userProfile.pob}</span>
            </div>
          </div>

          {/* Report Category Content */}
          {report.category === 'kundali' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-100/70 to-orange-100/50 border border-amber-300/70">
                <h4 className="font-bold text-amber-950 font-['Cinzel',serif] text-sm sm:text-base flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>लग्न व नवमांश भाव विश्लेषण (Lagna & Navamsha Synthesis)</span>
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  आपकी जन्म कुंडली में लग्न भाव अत्यंत तेजस्वी व बलवान है। प्रथमेश सूर्य का प्रभाव व्यक्तित्व में ओज, स्वाभिमान तथा नेतृत्व की स्वाभाविक क्षमता प्रदान करता है। नवमांश (D9) चक्र आपके भाग्योदय को 28वें से 32वें वर्ष के मध्य अत्यधिक अनुकूल दर्शाता है।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl border border-amber-200 bg-white space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 font-['Cinzel',serif]">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>महादशा व अंतर्दशा कालचक्र</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    वर्तमान में बृहस्पति (गुरु) की शुभ महादशा में बुध का अंतर चल रहा है। यह कालखंड ज्ञान, बौद्धिक निर्णय क्षमता और धन वृद्धि के लिए अत्यंत फलदायी है।
                  </p>
                  <div className="p-2 bg-amber-50 rounded text-[11px] text-amber-900 font-medium">
                    शुभ काल: आगामी 18 माह नई योजनाओं के प्रारंभ हेतु सर्वोत्तम हैं।
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-200 bg-white space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 font-['Cinzel',serif]">
                    <Flame className="w-4 h-4 text-rose-600" />
                    <span>प्रमुख राजयोग व ग्रह बल</span>
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>गजकेसरी योग</strong>: गुरु व चंद्र की शुभ दृष्टि से धन व यश।</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>बुधादित्य योग</strong>: वाणी व व्यावसायिक दक्षता में वृद्धि।</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>अमल कीर्ति योग</strong>: समाज व परिवार में मान-सम्मान।</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Remedies Section */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <h5 className="font-bold text-emerald-950 font-['Cinzel',serif] mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>सात्विक वैदिक उपाय व दैनिक नियम</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-emerald-900">
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                    <strong>सूर्य अर्घ्य:</strong> प्रातः काल तांबे के लोटे से ॐ सूर्याय नमः बोलकर जल अर्पित करें।
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                    <strong>अनुकूल रत्न:</strong> माणिक्य (Ruby) या पंचमुखी रुद्राक्ष धारण करना शुभ रहेगा।
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                    <strong>शुभ दिन व रंग:</strong> रविवार एवं गुरुवार; केसरिया व हल्का पीला रंग।
                  </div>
                </div>
              </div>
            </div>
          )}

          {report.category === 'marriage' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-100/70 via-pink-100/50 to-amber-100/50 border border-rose-300/70">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-rose-950 font-['Cinzel',serif] text-sm sm:text-base flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    <span>अष्टकूट 36 गुण मिलान स्कोर (Ashtakoot Compatibility)</span>
                  </h4>
                  <span className="text-sm font-bold px-3 py-1 bg-rose-600 text-white rounded-full font-['Cinzel',serif]">
                    29.5 / 36 गुण (उत्तम)
                  </span>
                </div>
                <p className="text-xs text-rose-900 leading-relaxed">
                  यह मिलान वैदिक मानकों के अनुसार 'उत्तम श्रेणी' का है। नाड़ी व भकूट दोष रहित होने के कारण दांपत्य जीवन में दीर्घायु, परस्पर स्नेह तथा संतान सुख की प्रबल संभावनाएं हैं।
                </p>
              </div>

              {/* 8 Koot Breakdown Table */}
              <div className="border border-amber-200 rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-amber-100/80 text-amber-900 font-bold border-b border-amber-200">
                    <tr>
                      <th className="p-2.5">कूट का नाम</th>
                      <th className="p-2.5">अधिकतम गुण</th>
                      <th className="p-2.5">प्राप्त गुण</th>
                      <th className="p-2.5">प्रभाव क्षेत्र</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    <tr>
                      <td className="p-2 font-medium">वर्ण (Varna)</td>
                      <td className="p-2">1</td>
                      <td className="p-2 text-emerald-700 font-bold">1</td>
                      <td className="p-2 text-slate-500">आध्यात्मिक व मानसिक सामंजस्य</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">वश्य (Vashya)</td>
                      <td className="p-2">2</td>
                      <td className="p-2 text-emerald-700 font-bold">2</td>
                      <td className="p-2 text-slate-500">पारस्परिक आकर्षण व नियंत्रण</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">तारा (Tara)</td>
                      <td className="p-2">3</td>
                      <td className="p-2 text-emerald-700 font-bold">2.5</td>
                      <td className="p-2 text-slate-500">स्वास्थ्य, सौभाग्य व दीर्घायु</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">योनि (Yoni)</td>
                      <td className="p-2">4</td>
                      <td className="p-2 text-emerald-700 font-bold">3</td>
                      <td className="p-2 text-slate-500">जैविक व भावनात्मक अनुकूलता</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">ग्रहमैत्री (Graha Maitri)</td>
                      <td className="p-2">5</td>
                      <td className="p-2 text-emerald-700 font-bold">5</td>
                      <td className="p-2 text-slate-500">मित्रता, विचार एवं पारिवारिक सुख</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">गण (Gana)</td>
                      <td className="p-2">6</td>
                      <td className="p-2 text-emerald-700 font-bold">5</td>
                      <td className="p-2 text-slate-500">स्वभाव व जीवनशैली समरसता</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">भकूट (Bhakoot)</td>
                      <td className="p-2">7</td>
                      <td className="p-2 text-emerald-700 font-bold">7</td>
                      <td className="p-2 text-slate-500">वंश वृद्धि व आर्थिक समृद्धि</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">नाड़ी (Nadi)</td>
                      <td className="p-2">8</td>
                      <td className="p-2 text-emerald-700 font-bold">8</td>
                      <td className="p-2 text-slate-500">जीन स्तर अनुकूलता व स्वास्थ्य</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Manglik assessment */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>मांगलिक विचार: आंशिक अथवा शून्य मांगलिक प्रभाव</span>
                </span>
                <p className="text-slate-600">
                  सप्तम भाव में गुरु की शुभ दृष्टि होने से किसी भी प्रकार के मंगल दोष का स्वतः शमन हो जाता है। विवाह अत्यंत शुभ रहेगा।
                </p>
              </div>
            </div>
          )}

          {report.category === 'career' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-100/70 via-teal-100/50 to-amber-100/50 border border-emerald-300/70">
                <h4 className="font-bold text-emerald-950 font-['Cinzel',serif] text-sm sm:text-base flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  <span>कर्म भाव (10th House) व धन योग (Wealth Potential)</span>
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  आपकी कुंडली का दशम भाव कर्मक्षेत्र में अधिकार, प्रशासनिक प्रभाव व स्वतंत्र व्यवसाय को सर्वाधिक समर्थन देता है। एकादश भाव (लाभ स्थान) में शुक्र व बुध का मेल उत्तम धन प्रदायक है।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl border border-amber-200 bg-white space-y-2">
                  <strong className="text-slate-900 block font-['Cinzel',serif]">अनुकूल कार्यक्षेत्र (Top Careers)</strong>
                  <ul className="space-y-1 text-slate-600">
                    <li>• प्रबंधन, नेतृत्व एवं प्रशासनिक सेवाएं (Management / Civil)</li>
                    <li>• टेक्नोलॉजी, डेटा व डिजिटल परामर्श (Tech & Consultancy)</li>
                    <li>• रियल एस्टेट, निर्माण अथवा सात्विक व्यापार</li>
                    <li>• शिक्षण, अनुसंधान एवं वित्तीय सलाहकार</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-200 bg-white space-y-2">
                  <strong className="text-slate-900 block font-['Cinzel',serif]">आगामी पदोन्नति व धन लाभ काल</strong>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                      <strong>स्वर्ण काल:</strong> आगामी 6 से 14 माह में जॉब चेंज या पदोन्नति के प्रबल योग।
                    </div>
                    <p className="text-[11px]">
                      साझेदारी के मामलों में दस्तावेज़ सतर्कता से पढ़ें। व्यक्तिगत व्यवसाय में निवेश फलदायी रहेगा।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Highlights & Guarantee */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>प्रमाणित काशी वैदिक ज्योतिष परंपरा द्वारा सत्यापित गणना।</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              डिजिटल रिपोर्ट आईडी: {report.id}-{Date.now().toString().slice(-4)}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-3.5 bg-white border-t border-amber-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Jyotishi Live Verified Astrological Analysis
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-xs"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
