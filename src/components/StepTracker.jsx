import { Lightbulb, Briefcase, Target, LayoutTemplate, CheckSquare, FileText } from 'lucide-react';

export default function StepTracker({ activeStepGroup, t }) {
  const stepsTracker = [
    { id: 1, label: t('misc.step_1'), icon: <Lightbulb className="w-5 h-5" /> },
    { id: 2, label: t('misc.step_2'), icon: <Briefcase className="w-5 h-5" /> },
    { id: 3, label: t('misc.step_3'), icon: <Target className="w-5 h-5" /> },
    { id: 4, label: t('misc.step_4'), icon: <LayoutTemplate className="w-5 h-5" /> },
    { id: 5, label: t('misc.step_5'), icon: <CheckSquare className="w-5 h-5" /> },
    { id: 6, label: t('app.btn_review'), icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex justify-between items-center overflow-x-auto gap-2 scrollbar-hide py-2 relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -z-10 translate-y-[-100%] rounded-full mx-6 hidden md:block"></div>
      {stepsTracker.map((step) => {
        const isActive = activeStepGroup === step.id;
        const isPassed = activeStepGroup > step.id;
        return (
          <div key={step.id} className="flex flex-col items-center flex-1 min-w-[80px] text-center relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 z-10 bg-white ${
                isActive
                  ? 'border-2 border-indigo-500 bg-indigo-50 text-indigo-600 shadow-md scale-110'
                  : isPassed
                  ? 'border-2 border-indigo-400 bg-white text-indigo-500'
                  : 'border-2 border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              {step.icon}
            </div>
            <span
              className={`text-xs font-semibold transition-colors duration-300 ${
                isActive
                  ? 'text-indigo-600 font-bold'
                  : isPassed
                  ? 'text-indigo-500'
                  : 'text-slate-400'
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
