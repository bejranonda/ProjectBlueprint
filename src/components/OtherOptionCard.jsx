import { Check, PenTool } from 'lucide-react';

export default function OtherOptionCard({ type, isSelected, otherText, onSelect, onTextChange }) {
  const inputId = type === 'single' ? 'otherInput' : 'otherInputMulti';

  return (
    <div
      onClick={onSelect}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col h-full ${
        isSelected
          ? 'border-blue-500 bg-[#f0f4ff] shadow-md'
          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 bg-white'
      }`}
    >
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

      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
          isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
        }`}
      >
        <PenTool className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-bold mb-3 text-slate-800">อื่นๆ (โปรดระบุ)</h3>

      {isSelected && (
        <div className="mt-2" onClick={(e) => e.stopPropagation()}>
          <input
            id={inputId}
            type="text"
            value={otherText}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-0 focus:border-blue-500 outline-none bg-white"
            placeholder="พิมพ์คำตอบของคุณที่นี่..."
          />
        </div>
      )}
    </div>
  );
}
