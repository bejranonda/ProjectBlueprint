import { useState } from 'react';
import { Check, Info } from 'lucide-react';

export default function OptionCard({ opt, isSelected, type, onSelect }) {
  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = (e) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  return (
    <div
      onClick={onSelect}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col h-full overflow-hidden group ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.02]'
          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 bg-white shadow-sm hover:shadow-md'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isSelected ? 'opacity-100' : ''}`}></div>
      
      {/* Top Check Indicator */}
      <div className="absolute top-6 right-6 z-10">
        {type === 'single' ? (
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
              isSelected ? 'border-indigo-500 bg-indigo-500 shadow-sm' : 'border-slate-300 bg-white group-hover:border-slate-400'
            }`}
          >
            {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
          </div>
        ) : (
          <div
            className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors duration-300 ${
              isSelected ? 'bg-indigo-600 border-indigo-600 shadow-sm' : 'border-slate-300 bg-white group-hover:border-slate-400'
            }`}
          >
            {isSelected && <Check className="w-4 h-4 text-white" />}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 relative z-10 mb-4">
        {opt.icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              isSelected ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' : 'bg-slate-100 text-slate-500 border border-slate-200 group-hover:text-indigo-500 group-hover:bg-indigo-50'
            }`}
          >
            {opt.icon}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-2 relative z-10">
        <h3 className={`text-xl font-bold transition-colors duration-300 ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
          {opt.label}
        </h3>
        {opt.desc && (
          <button 
            onClick={handleInfoClick} 
            className={`p-1 rounded-full transition-colors ${showInfo || isSelected ? 'text-indigo-500 bg-indigo-100' : 'text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600'}`}
            title="Show examples"
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>

      {(showInfo || isSelected) && opt.desc && (
        <div className={`p-3 rounded-xl text-sm leading-relaxed mb-4 relative z-10 transition-all duration-300 animate-fadeIn ${isSelected ? 'bg-white/60 text-indigo-800 border border-indigo-100' : 'bg-slate-100/80 text-slate-600 border border-slate-200'}`}>
          <span className="block font-semibold mb-1 text-xs uppercase tracking-wider opacity-70">Example:</span>
          {opt.desc}
        </div>
      )}

      {opt.features && (
        <div className="mt-auto pt-4 space-y-2 relative z-10 border-t border-slate-100">
          {opt.features.map((feat, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 text-sm font-medium transition-colors duration-300 ${
                isSelected ? 'text-indigo-700' : 'text-slate-500 group-hover:text-slate-600'
              }`}
            >
              <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-indigo-500' : 'text-slate-400'}`} />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
