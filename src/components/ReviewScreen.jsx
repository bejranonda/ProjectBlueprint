import { CheckCircle2 } from 'lucide-react';
import { generateMarkdown } from '../utils/markdownGenerator';

export default function ReviewScreen({ answers }) {
  return (
    <div className="flex-grow flex flex-col">
      <div className="text-center mb-8">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-slate-800 mb-2">สร้าง Blueprint สำเร็จแล้ว!</h2>
        <p className="text-slate-500">ตรวจสอบความถูกต้องและดาวน์โหลดไฟล์ไปใช้กับ AI</p>
      </div>

      <div className="bg-[#1e1e2e] text-[#cdd6f4] p-8 rounded-2xl overflow-y-auto flex-grow font-mono text-sm shadow-inner whitespace-pre-wrap">
        {generateMarkdown(answers)}
      </div>
    </div>
  );
}
