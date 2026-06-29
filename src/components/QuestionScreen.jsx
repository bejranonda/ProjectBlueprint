import OptionCard from './OptionCard';
import OtherOptionCard from './OtherOptionCard';

export default function QuestionScreen({
  currentQ,
  currentQuestionId,
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
  // Both textarea questions (project description and sample content) are
  // optional — neither is enforced by isNextDisabled and markdownGenerator
  // falls back gracefully when they're blank — so always show the hint.
  const isOptionalTextarea = currentQ.type === 'textarea';
  const isSingle = currentQ.type === 'single';

  // Ordered value list (options + the optional "other" card) used for arrow-key nav.
  const orderedValues = isSingle
    ? [...currentQ.options.map((o) => o.value), ...(currentQ.otherOption ? ['other'] : [])]
    : [];

  // Roving tabindex: in a radiogroup only one radio is in the tab order — the
  // selected one, or the first when nothing is selected yet. Checkbox groups
  // keep every card independently tabbable.
  const rovingValue = isSingle ? singleValue || currentQ.options[0]?.value : null;

  // WAI-ARIA radio pattern: arrow keys move focus AND selection between radios.
  const handleGroupKeyDown = (e) => {
    if (!isSingle) return;
    const navKeys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (!navKeys.includes(e.key)) return;
    e.preventDefault();

    const radios = Array.from(e.currentTarget.querySelectorAll('[role="radio"]'));
    if (radios.length === 0) return;

    const activeIdx = radios.indexOf(document.activeElement);
    const startIdx = activeIdx === -1 ? Math.max(0, orderedValues.indexOf(singleValue)) : activeIdx;
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const nextIdx = (startIdx + dir + radios.length) % radios.length;

    radios[nextIdx].focus();
    // Select via the single-value setter directly so landing on "other" doesn't
    // steal focus into its text input (that only happens on click/Enter/Space).
    onSingleSelect(orderedValues[nextIdx]);
  };

  return (
    <div className="flex-grow">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">{currentQ.title}</h2>
        {currentQ.description && <p className="text-lg text-slate-600 font-medium">{currentQ.description}</p>}
      </div>

      {/* Options Grid */}
      {currentQ.type !== 'textarea' && (
        <div
          role={isSingle ? 'radiogroup' : 'group'}
          aria-label={currentQ.title}
          onKeyDown={handleGroupKeyDown}
          className={`grid gap-6 ${
            currentQ.options.some((o) => o.features)
              ? 'grid-cols-1 md:grid-cols-2'
              : currentQ.options.length > 4
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {currentQ.options.map((opt) => {
            const isSelected = isSingle
              ? singleValue === opt.value
              : multipleValues.includes(opt.value);

            return (
              <OptionCard
                key={opt.value}
                opt={opt}
                isSelected={isSelected}
                type={currentQ.type}
                tabIndex={isSingle ? (opt.value === rovingValue ? 0 : -1) : 0}
                onSelect={() =>
                  isSingle ? onSingleSelect(opt.value) : onToggleMultiple(opt.value)
                }
                t={t}
              />
            );
          })}

          {/* Other Option */}
          {currentQ.otherOption && (
            <OtherOptionCard
              type={currentQ.type}
              isSelected={isSingle ? singleValue === 'other' : isOtherSelected}
              tabIndex={isSingle ? ('other' === rovingValue ? 0 : -1) : 0}
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
          {isOptionalTextarea && (
            <p className="text-center text-sm text-slate-400 italic">({t ? t('misc.optional_hint') : 'optional'})</p>
          )}
          <textarea
            value={textValue}
            onChange={(e) => onTextAreaChange(e.target.value)}
            rows="10"
            className="w-full p-6 text-base border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none bg-slate-50 hover:bg-white text-slate-800 transition-all duration-300 leading-relaxed placeholder-slate-400 shadow-inner"
            placeholder={t ? t(`questions.${currentQuestionId}.placeholder`, '') : ''}
          />
        </div>
      )}
    </div>
  );
}
