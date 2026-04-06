import { useState } from 'react';
import { CheckCircle2, Sparkles, Loader2, Copy, Check, Lightbulb } from 'lucide-react';
import { generateMarkdown } from '../utils/markdownGenerator';

export default function ReviewScreen({ answers, t }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const markdownContent = generateMarkdown(answers, t);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCompare = async () => {
    setIsGenerating(true);
    setError(null);
    setAiResult('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blueprint: markdownContent,
          systemPrompt: "Based on the provided project blueprint, provide two things: 1. A short, concise summary. 2. A few practical usage examples separated by headers."
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      // Streaming response reader
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setAiResult((prev) => prev + chunk);
        }
      }
    } catch (error) {
      console.error("Failed to generate AI content:", error);
      setError('AI service is currently unavailable or took too long. However, you can still copy your blueprint above and use it directly with ChatGPT, Gemini, or Claude!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col relative z-10 w-full animate-fadeIn max-h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-200">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">
          {t ? t('app.review_title') : 'สร้าง Blueprint สำเร็จแล้ว!'}
        </h2>
        <p className="text-slate-600 font-medium">
          {t ? t('app.review_desc') : 'ตรวจสอบความถูกต้องและคัดลอกไฟล์ไปใช้กับ AI'}
        </p>
      </div>

      {/* Usage Guide */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8 text-slate-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold mb-2 text-blue-900">How to use this Blueprint for Vibe Coding</h3>
            <p className="text-sm leading-relaxed mb-3">
              Copy the markdown text below and paste it into any AI tool (e.g., <strong>Gemini</strong>, <strong>ClaudeCode</strong>, <strong>OpenCode</strong>, or <strong>CloudCowork</strong>). Start your prompt with: 
            </p>
            <code className="bg-white px-3 py-2 rounded border border-blue-200 text-sm font-mono text-blue-800 block shadow-sm">
              "Here is my project blueprint. Please use this as context to help me code/design my application..."
            </code>
          </div>
        </div>
      </div>

      <div className="relative group">
        <button 
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg shadow-sm transition-all flex items-center gap-2 font-medium text-sm"
        >
          {copied ? <><Check className="w-4 h-4 text-emerald-600" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
        </button>
        <div className="bg-slate-50 border border-slate-200 text-slate-700 p-6 md:p-8 rounded-2xl overflow-y-auto max-h-[40vh] font-mono text-sm shadow-inner whitespace-pre-wrap leading-relaxed mb-8 select-all">
          {markdownContent}
        </div>
      </div>

      {/* AI Streaming Section */}
      <div className="mt-4 pt-6 border-t border-slate-200">
        {!aiResult && !isGenerating && !error ? (
          <div className="flex justify-center">
            <button
              onClick={handleGenerateCompare}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-all duration-300 shadow-sm"
            >
              <Sparkles className="w-5 h-5" /> 
              {t ? t('app.compare_btn_generate') : 'สรุปและสร้างตัวอย่างจาก AI'}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-slate-800">AI Summary & Examples</h3>
            </div>
            
            <div className="p-6 text-sm text-slate-700 leading-relaxed font-sans max-h-[40vh] overflow-y-auto bg-white whitespace-pre-wrap custom-scrollbar">
              {error ? (
                <div className="text-red-500 font-medium p-4 bg-red-50 rounded-xl border border-red-100">
                  {error}
                </div>
              ) : (
                aiResult
              )}
              {isGenerating && (
                <div className="flex items-center gap-2 mt-4 text-indigo-500 font-medium animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
