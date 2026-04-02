import { useEffect } from 'react';
import { LayoutTemplate, ArrowLeft, ChevronRight, Download, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWizard } from './hooks/useWizard';
import { downloadMarkdown } from './utils/markdownGenerator';
import StepTracker from './components/StepTracker';
import QuestionScreen from './components/QuestionScreen';
import ReviewScreen from './components/ReviewScreen';

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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
  } = useWizard(t);

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

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 selection:bg-indigo-500/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 pt-8 pb-20 border-b border-indigo-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-indigo-300">
              <LayoutTemplate className="w-8 h-8" />
              <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                {t('app.title')}
              </h1>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-1 border border-slate-700/50 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-indigo-400" />
              <select 
                onChange={handleLanguageChange} 
                value={i18n.language}
                className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer focus:ring-0 [&>option]:bg-slate-800"
              >
                <option value="th">ไทย</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
          <p className="text-indigo-200/70 text-base max-w-2xl">
            {t('app.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-10">
        {/* Step Tracker */}
        <div className="bg-slate-900 rounded-2xl p-4 mb-6 border border-slate-800/60 shadow-xl backdrop-blur-md">
          <StepTracker activeStepGroup={activeStepGroup} t={t} />
        </div>

        {/* Dynamic Content Area */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800/80 p-8 md:p-12 animate-fadeIn min-h-[500px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
          
          {isReview ? (
            <ReviewScreen answers={answers} t={t} />
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
              t={t}
            />
          )}

          {/* Navigation Footer */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex justify-between items-center relative z-20">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition duration-200 ${
                history.length === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700/50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> {t('app.btn_back')}
            </button>

            {isReview ? (
              <button
                onClick={() => downloadMarkdown(answers, t)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5"
              >
                <Download className="w-6 h-6" /> {t('app.btn_download')}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isNextDisabled
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/30'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5'
                }`}
              >
                {currentQ.next === 'REVIEW' ? t('app.btn_review') : t('app.btn_next')}{' '}
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
