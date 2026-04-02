import { Check } from 'lucide-react';

export default function OptionCard({ opt, isSelected, type, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col h-full overflow-hidden group ${
        isSelected
          ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)] transform scale-[1.02]'
          : 'border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-800/50 bg-slate-900/40 backdrop-blur-sm'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isSelected ? 'opacity-100' : ''}`}></div>
      
      {/* Top Check Indicator */}
      <div className="absolute top-6 right-6 z-10">
        {type === 'single' ? (
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
              isSelected ? 'border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'border-slate-600 group-hover:border-slate-500'
            }`}
          >
            {isSelected && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
          </div>
        ) : (
          <div
            className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors duration-300 ${
              isSelected ? 'bg-indigo-600 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'border-slate-600 group-hover:border-slate-500'
            }`}
          >
            {isSelected && <Check className="w-4 h-4 text-white" />}
          </div>
        )}
      </div>

      {opt.icon && (
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 relative z-10 ${
            isSelected ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800/80 text-slate-400 border border-slate-700/50 group-hover:text-slate-300 group-hover:bg-slate-800'
          }`}
        >
          {opt.icon}
        </div>
      )}

      <h3 className={`text-xl font-bold mb-2 relative z-10 transition-colors duration-300 ${isSelected ? 'text-white drop-shadow-sm' : 'text-slate-200 group-hover:text-white'}`}>
        {opt.label}
      </h3>

      {opt.desc && (
        <p className={`text-sm leading-relaxed mb-4 relative z-10 transition-colors duration-300 ${isSelected ? 'text-indigo-200/90' : 'text-slate-400 group-hover:text-slate-300'}`}>
          {opt.desc}
        </p>
      )}

      {opt.features && (
        <div className="mt-auto pt-4 space-y-2 relative z-10 border-t border-slate-800/50">
          {opt.features.map((feat, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 text-sm font-medium transition-colors duration-300 ${
                isSelected ? 'text-indigo-300' : 'text-slate-500 group-hover:text-slate-400'
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
