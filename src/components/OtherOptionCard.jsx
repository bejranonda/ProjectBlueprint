import { Check, PenTool } from 'lucide-react';

export default function OtherOptionCard({ type, isSelected, otherText, onSelect, onTextChange, t }) {
  const inputId = type === 'single' ? 'otherInput' : 'otherInputMulti';

  return (
    <div
      onClick={onSelect}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col h-full overflow-hidden group ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 shadow-md scale-[1.02]'
          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 bg-white shadow-sm hover:shadow-md'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isSelected ? 'opacity-100' : ''}`}></div>

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

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 relative z-10 ${
          isSelected ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' : 'bg-slate-100 text-slate-500 border border-slate-200 group-hover:text-indigo-500 group-hover:bg-indigo-50'
        }`}
      >
        <PenTool className="w-6 h-6" />
      </div>

      <h3 className={`text-xl font-bold mb-3 relative z-10 transition-colors duration-300 ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
        {t ? t('misc.other') : 'อื่นๆ (โปรดระบุ)'}
      </h3>

      {isSelected && (
        <div className="mt-2 relative z-10" onClick={(e) => e.stopPropagation()}>
          <input
            id={inputId}
            type="text"
            value={otherText}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none bg-white text-slate-800 placeholder-slate-400 transition-all duration-300 shadow-inner"
            placeholder="..."
          />
        </div>
      )}
    </div>
  );
}
