import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function OptionCard({ opt, isSelected, type, onSelect, t, tabIndex = 0 }) {
  const [showScenario, setShowScenario] = useState(false);

  const handleScenarioToggle = (e) => {
    e.stopPropagation();
    setShowScenario(!showScenario);
  };

  const handleKeyDown = (e) => {
    // Activate the card with Enter or Space, matching native control behavior.
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role={type === 'single' ? 'radio' : 'checkbox'}
      aria-checked={isSelected}
      aria-label={opt.label}
      tabIndex={tabIndex}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col h-full overflow-hidden group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 ${
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

      {/* Icon */}
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

      {/* Label + View Example link */}
      <div className="flex items-center gap-2 mb-2 relative z-10">
        <h3 className={`text-xl font-bold transition-colors duration-300 ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
          {opt.label}
        </h3>
      </div>

      {/* Tags */}
      {opt.tags && opt.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3 relative z-10">
          {opt.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors duration-300 ${
                isSelected
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description (auto-show when selected) */}
      {isSelected && opt.desc && (
        <div className="p-3 rounded-xl text-sm leading-relaxed mb-3 relative z-10 bg-white/60 text-indigo-800 border border-indigo-100 animate-fadeIn">
          <span className="block font-semibold mb-1 text-xs uppercase tracking-wider opacity-70">{t ? t('app.tooltip_example') : 'Example:'}</span>
          {opt.desc}
        </div>
      )}

      {/* View Example toggle */}
      {opt.desc && !isSelected && (
        <button
          onClick={handleScenarioToggle}
          className="flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors relative z-10 mb-2 group/btn"
        >
          {showScenario ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {t ? t('misc.view_example') : 'View Example'}
        </button>
      )}

      {/* Expandable scenario panel */}
      {showScenario && !isSelected && (
        <div className="p-4 rounded-xl text-sm leading-relaxed mb-3 relative z-10 bg-amber-50 text-amber-900 border-l-4 border-amber-400 animate-fadeIn">
          <span className="block font-bold mb-1.5 text-amber-700">
            {t ? t('misc.scenario_heading') : 'Example Scenario'}:
          </span>
          {opt.desc}
        </div>
      )}

      {/* Features list */}
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
