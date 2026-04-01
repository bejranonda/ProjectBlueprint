import { Check } from 'lucide-react';

export default function OptionCard({ opt, isSelected, type, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col h-full ${
        isSelected
          ? 'border-blue-500 bg-[#f0f4ff] shadow-md transform scale-[1.02]'
          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 bg-white'
      }`}
    >
      {/* Top Check Indicator */}
      <div className="absolute top-6 right-6">
        {type === 'single' ? (
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isSelected ? 'border-blue-600' : 'border-slate-300'
            }`}
          >
            {isSelected && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
          </div>
        ) : (
          <div
            className={`w-6 h-6 rounded flex items-center justify-center border-2 ${
              isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
            }`}
          >
            {isSelected && <Check className="w-4 h-4 text-white" />}
          </div>
        )}
      </div>

      {opt.icon && (
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
            isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {opt.icon}
        </div>
      )}

      <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
        {opt.label}
      </h3>

      {opt.desc && (
        <p className={`text-sm leading-relaxed mb-4 ${isSelected ? 'text-blue-800/80' : 'text-slate-500'}`}>
          {opt.desc}
        </p>
      )}

      {opt.features && (
        <div className="mt-auto pt-4 space-y-2">
          {opt.features.map((feat, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 text-sm font-medium ${
                isSelected ? 'text-blue-800' : 'text-slate-600'
              }`}
            >
              <Check className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
