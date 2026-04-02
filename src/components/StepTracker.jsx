import { Briefcase, Target, LayoutTemplate, CheckSquare, FileText } from 'lucide-react';

export default function StepTracker({ activeStepGroup, t }) {
  const stepsTracker = [
    { id: 1, label: t('misc.step_1'), icon: <Briefcase className="w-5 h-5" /> },
    { id: 2, label: t('misc.step_2'), icon: <Target className="w-5 h-5" /> },
    { id: 3, label: t('misc.step_3'), icon: <LayoutTemplate className="w-5 h-5" /> },
    { id: 4, label: t('misc.step_4'), icon: <CheckSquare className="w-5 h-5" /> },
    { id: 5, label: t('app.btn_review'), icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex justify-between items-center overflow-x-auto gap-4 scrollbar-hide py-2">
      {stepsTracker.map((step) => {
        const isActive = activeStepGroup === step.id;
        const isPassed = activeStepGroup > step.id;
        return (
          <div key={step.id} className="flex flex-col items-center flex-1 min-w-[100px] text-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                isActive
                  ? 'border border-indigo-500 bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : isPassed
                  ? 'border border-indigo-500/50 bg-indigo-900/40 text-indigo-500'
                  : 'border border-slate-700/50 bg-slate-800/30 text-slate-500'
              }`}
            >
              {step.icon}
            </div>
            <span
              className={`text-sm font-semibold transition-colors duration-300 ${
                isActive 
                  ? 'text-indigo-400' 
                  : isPassed 
                  ? 'text-indigo-500/80' 
                  : 'text-slate-500'
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
