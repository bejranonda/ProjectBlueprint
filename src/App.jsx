import { useEffect } from 'react';
import { LayoutTemplate, ArrowLeft, ChevronRight, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWizard } from './hooks/useWizard';
import { downloadMarkdown } from './utils/markdownGenerator';
import StepTracker from './components/StepTracker';
import QuestionScreen from './components/QuestionScreen';
import ReviewScreen from './components/ReviewScreen';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n';

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 selection:bg-indigo-500/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 pt-8 pb-24 shadow-inner">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-white">
              <LayoutTemplate className="w-8 h-8" />
              <h1 className="text-3xl font-bold tracking-tight">
                {t('app.title')}
              </h1>
              <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full tracking-wide">{t('app.version')}</span>
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher
              currentLang={i18n.language}
              onChangeLang={(code) => i18n.changeLanguage(code)}
            />
          </div>
          <p className="text-indigo-100 text-base max-w-2xl font-medium mt-2">
            {t('app.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-14 relative z-10">
        {/* Step Tracker */}
        <div className="bg-white rounded-2xl p-5 mb-8 border border-slate-200 shadow-md">
          <StepTracker activeStepGroup={activeStepGroup} t={t} />
        </div>

        {/* Dynamic Content Area */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 animate-fadeIn min-h-[500px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"></div>
          
          {isReview ? (
            <ReviewScreen answers={answers} t={t} />
          ) : (
            <QuestionScreen
              currentQ={currentQ}
              currentQuestionId={currentQuestionId}
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
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center relative z-20">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition duration-200 ${
                history.length === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent'
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> {t('app.btn_back')}
            </button>

            {isReview ? (
              <button
                onClick={() => downloadMarkdown(answers, t)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5"
              >
                <Download className="w-6 h-6" /> {t('app.btn_download')}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isNextDisabled
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5'
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
