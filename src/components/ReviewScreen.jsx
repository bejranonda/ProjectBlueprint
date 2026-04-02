import { useState } from 'react';
import { CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { generateMarkdown } from '../utils/markdownGenerator';

export default function ReviewScreen({ answers, t }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [comparedData, setComparedData] = useState(null);
  const [activeTab, setActiveTab] = useState('with');

  const markdownContent = generateMarkdown(answers);

  const handleGenerateCompare = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blueprint: markdownContent,
          systemPrompt: "Write a short promotional post about the project."
        }),
      });
      const data = await response.json();
      setComparedData(data);
    } catch (error) {
      console.error("Failed to generate comparison:", error);
      // fallback for demo if fails locally
      setComparedData({
        withoutBlueprint: "Error generating example or Cloudflare credentials missing.",
        withBlueprint: "Error generating example or Cloudflare credentials missing."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col relative z-10 w-full animate-fadeIn max-h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center mb-8">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          {t ? t('app.review_title') : 'สร้าง Blueprint สำเร็จแล้ว!'}
        </h2>
        <p className="text-indigo-300">
          {t ? t('app.review_desc') : 'ตรวจสอบความถูกต้องและดาวน์โหลดไฟล์ไปใช้กับ AI'}
        </p>
      </div>

      <div className="bg-slate-950/80 border border-slate-800 text-indigo-100/90 p-6 md:p-8 rounded-2xl overflow-y-auto max-h-[40vh] font-mono text-sm shadow-inner whitespace-pre-wrap leading-relaxed mb-8 select-all">
        {markdownContent}
      </div>

      {/* AI Comparison Section */}
      <div className="mt-4 pt-6 border-t border-slate-800">
        {!comparedData && !isGenerating ? (
          <div className="flex justify-center">
            <button
              onClick={handleGenerateCompare}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-slate-800 border border-indigo-500/50 hover:bg-slate-700 transition-all duration-300 shadow-[0_0_10px_rgba(99,102,241,0.2)] hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
            >
              <Sparkles className="w-5 h-5 text-indigo-400" /> 
              {t ? t('app.compare_btn_generate') : 'เปรียบเทียบผลลัพธ์จาก AI'}
            </button>
          </div>
        ) : isGenerating ? (
          <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-xl border border-slate-800">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
            <p className="text-indigo-300 animate-pulse">
              {t ? t('app.compare_loading') : 'กำลังสร้างตัวอย่างจาก Cloudflare AI...'}
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
            <div className="flex border-b border-slate-800">
              <button 
                className={`flex-1 py-3 px-4 font-semibold text-sm transition-colors ${activeTab === 'without' ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
                onClick={() => setActiveTab('without')}
              >
                {t ? t('app.compare_tab_without') : 'AI โดยไม่มี Blueprint'}
              </button>
              <button 
                className={`flex-1 py-3 px-4 font-semibold text-sm transition-colors ${activeTab === 'with' ? 'bg-indigo-900/40 text-indigo-300' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
                onClick={() => setActiveTab('with')}
              >
                {t ? t('app.compare_tab_with') : 'AI เมื่อใช้ Blueprint'} <Sparkles className="inline w-3 h-3 ml-1 text-indigo-400"/>
              </button>
            </div>
            <div className="p-6 bg-slate-950 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[30vh] overflow-y-auto">
              {activeTab === 'without' ? comparedData.withoutBlueprint : comparedData.withBlueprint}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
