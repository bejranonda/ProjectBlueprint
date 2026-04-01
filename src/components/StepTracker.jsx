import { Briefcase, Target, LayoutTemplate, CheckSquare, FileText } from 'lucide-react';

const stepsTracker = [
  { id: 1, label: 'ประเภทโครงการ', icon: <Briefcase className="w-5 h-5" /> },
  { id: 2, label: 'บริบท (Discovery)', icon: <Target className="w-5 h-5" /> },
  { id: 3, label: 'เจาะลึกรายละเอียด', icon: <LayoutTemplate className="w-5 h-5" /> },
  { id: 4, label: 'ตัวอย่างสไตล์', icon: <CheckSquare className="w-5 h-5" /> },
  { id: 5, label: 'สร้าง Blueprint', icon: <FileText className="w-5 h-5" /> },
];

export default function StepTracker({ activeStepGroup }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex justify-between items-center overflow-x-auto gap-4">
      {stepsTracker.map((step) => {
        const isActive = activeStepGroup === step.id;
        const isPassed = activeStepGroup > step.id;
        return (
          <div key={step.id} className="flex flex-col items-center flex-1 min-w-[100px] text-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
                isActive || isPassed
                  ? 'border-2 border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-2 border-slate-200 text-slate-300'
              }`}
            >
              {step.icon}
            </div>
            <span
              className={`text-sm font-semibold ${
                isActive || isPassed ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
