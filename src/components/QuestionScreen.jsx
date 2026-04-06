import OptionCard from './OptionCard';
import OtherOptionCard from './OtherOptionCard';

export default function QuestionScreen({
  currentQ,
  singleValue,
  multipleValues,
  otherText,
  isOtherSelected,
  textValue,
  onSingleSelect,
  onToggleMultiple,
  onOtherSelect,
  onOtherTextChange,
  onTextAreaChange,
  t
}) {
  return (
    <div className="flex-grow">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">{currentQ.title}</h2>
        {currentQ.description && <p className="text-lg text-slate-600 font-medium">{currentQ.description}</p>}
      </div>

      {/* Options Grid */}
      {currentQ.type !== 'textarea' && (
        <div
          className={`grid gap-6 ${
            currentQ.options.some((o) => o.features)
              ? 'grid-cols-1 md:grid-cols-2'
              : currentQ.options.length > 4
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {currentQ.options.map((opt) => {
            const isSelected =
              currentQ.type === 'single'
                ? singleValue === opt.value
                : multipleValues.includes(opt.value);

            return (
              <OptionCard
                key={opt.value}
                opt={opt}
                isSelected={isSelected}
                type={currentQ.type}
                onSelect={() =>
                  currentQ.type === 'single' ? onSingleSelect(opt.value) : onToggleMultiple(opt.value)
                }
              />
            );
          })}

          {/* Other Option */}
          {currentQ.otherOption && (
            <OtherOptionCard
              type={currentQ.type}
              isSelected={currentQ.type === 'single' ? singleValue === 'other' : isOtherSelected}
              otherText={otherText}
              onSelect={onOtherSelect}
              onTextChange={onOtherTextChange}
              t={t}
            />
          )}
        </div>
      )}

      {/* Textarea */}
      {currentQ.type === 'textarea' && (
        <div className="max-w-3xl mx-auto space-y-4">
          <textarea
            value={textValue}
            onChange={(e) => onTextAreaChange(e.target.value)}
            rows="10"
            className="w-full p-6 text-base border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none bg-slate-50 hover:bg-white text-slate-800 transition-all duration-300 leading-relaxed placeholder-slate-400 shadow-inner"
            placeholder={t('questions.q_sample_text.placeholder')}
          />
        </div>
      )}
    </div>
  );
}
