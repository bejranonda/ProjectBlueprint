import { LayoutTemplate, ArrowLeft, ChevronRight, Download } from 'lucide-react';

import { useWizard } from './hooks/useWizard';
import { downloadMarkdown } from './utils/markdownGenerator';
import StepTracker from './components/StepTracker';
import QuestionScreen from './components/QuestionScreen';
import ReviewScreen from './components/ReviewScreen';

export default function App() {
  const {
    currentQ,
    currentQuestionId,
    activeStepGroup,
    isReview,
    answers,
    history,
    singleValue,
    multipleValues,
    otherText,
    isOtherSelected,
    textValue,
    isNextDisabled,
    setSingleValue,
    setOtherText,
    setIsOtherSelected,
    setTextValue,
    handleNext,
    handleBack,
    toggleMultiple,
  } = useWizard();

  const handleOtherSelect = () => {
    if (currentQ.type === 'single') {
      setSingleValue('other');
      setTimeout(() => document.getElementById('otherInput')?.focus(), 50);
    } else {
      setIsOtherSelected(!isOtherSelected);
      if (!isOtherSelected) {
        setTimeout(() => document.getElementById('otherInputMulti')?.focus(), 50);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-800 font-sans pb-16">
      {/* Header */}
      <div className="bg-[#3b41c5] bg-gradient-to-r from-[#2c33a3] to-[#464cc9] pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 text-white mb-2">
            <LayoutTemplate className="w-8 h-8" />
            <h1 className="text-3xl font-bold">AI Project Blueprint Architect</h1>
          </div>
          <p className="text-blue-100 text-base">
            กำหนดโครงสร้างความคิดให้ AI ทำงานแทนคุณได้อย่างแม่นยำ
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-12">
        {/* Step Tracker */}
        <StepTracker activeStepGroup={activeStepGroup} />

        {/* Dynamic Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 animate-fadeIn min-h-[500px] flex flex-col">
          {isReview ? (
            <ReviewScreen answers={answers} />
          ) : (
            <QuestionScreen
              currentQ={currentQ}
              singleValue={singleValue}
              multipleValues={multipleValues}
              otherText={otherText}
              isOtherSelected={isOtherSelected}
              textValue={textValue}
              onSingleSelect={setSingleValue}
              onToggleMultiple={toggleMultiple}
              onOtherSelect={handleOtherSelect}
              onOtherTextChange={setOtherText}
              onTextAreaChange={setTextValue}
            />
          )}

          {/* Navigation Footer */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                history.length === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> ย้อนกลับ
            </button>

            {isReview ? (
              <button
                onClick={() => downloadMarkdown(answers)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download className="w-6 h-6" /> ดาวน์โหลด Blueprint
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition shadow-md ${
                  isNextDisabled
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {currentQ.next === 'REVIEW' ? 'ดูผลลัพธ์' : 'ถัดไป'}{' '}
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
