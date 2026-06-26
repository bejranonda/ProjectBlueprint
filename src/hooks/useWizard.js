import { useState, useEffect, useMemo, useCallback } from 'react';
import { getQuestionMap } from '../data/questionMap';

/**
 * Custom hook that encapsulates all wizard navigation and answer state.
 */
export function useWizard(t) {
  const [currentQuestionId, setCurrentQuestionId] = useState('q_purpose');
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});

  // Per-question transient state
  const [singleValue, setSingleValue] = useState('');
  const [multipleValues, setMultipleValues] = useState([]);
  const [otherText, setOtherText] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [textValue, setTextValue] = useState('');

  const questionMap = useMemo(() => getQuestionMap(t), [t]);
  const currentQ = questionMap[currentQuestionId];
  const activeStepGroup = currentQuestionId === 'REVIEW' ? 6 : (currentQ?.stepGroup || 1);
  const isReview = currentQuestionId === 'REVIEW';

  // Restore previous answer when navigating back
  useEffect(() => {
    if (isReview) return;

    const prevAnswer = answers[currentQuestionId];
    if (prevAnswer) {
      if (currentQ.type === 'single') {
        if (prevAnswer.isOther) {
          setSingleValue('other');
          setIsOtherSelected(true);
          setOtherText(prevAnswer.value);
        } else {
          setSingleValue(prevAnswer.value);
          setIsOtherSelected(false);
          setOtherText('');
        }
      } else if (currentQ.type === 'multiple') {
        const standardVals = currentQ.options.map((o) => o.value);
        const selectedStandard = prevAnswer.value.filter((v) => standardVals.includes(v));
        const selectedOther = prevAnswer.value.filter((v) => !standardVals.includes(v));

        setMultipleValues(selectedStandard);
        if (selectedOther.length > 0) {
          setIsOtherSelected(true);
          setOtherText(selectedOther.join(', '));
        } else {
          setIsOtherSelected(false);
          setOtherText('');
        }
      } else if (currentQ.type === 'textarea') {
        setTextValue(prevAnswer.value);
      }
    } else {
      setSingleValue('');
      setMultipleValues([]);
      setOtherText('');
      setIsOtherSelected(false);
      setTextValue('');
    }
  }, [currentQuestionId, answers, currentQ, isReview]);

  const handleNext = useCallback(() => {
    let finalValue, finalLabel, nextQId, isOther = false;

    if (currentQ.type === 'single') {
      if (!singleValue) return;

      if (singleValue === 'other') {
        if (!otherText.trim()) return;
        finalValue = otherText;
        finalLabel = otherText;
        isOther = true;
        nextQId = currentQ.otherOption?.next || currentQ.nextLevelFallback;
      } else {
        const selectedOpt = currentQ.options.find((o) => o.value === singleValue);
        finalValue = selectedOpt.value;
        finalLabel = selectedOpt.label;
        nextQId = selectedOpt.next || currentQ.nextLevelFallback;
      }
    } else if (currentQ.type === 'multiple') {
      if (multipleValues.length === 0 && (!isOtherSelected || !otherText.trim())) return;

      finalValue = [...multipleValues];
      finalLabel = multipleValues.map((v) => currentQ.options.find((o) => o.value === v)?.label || v);

      if (isOtherSelected && otherText.trim()) {
        finalValue.push(otherText);
        finalLabel.push(otherText);
      }
      nextQId = currentQ.next;
    } else if (currentQ.type === 'textarea') {
      finalValue = textValue;
      finalLabel = textValue;
      nextQId = currentQ.next;
    }

    // Guard against navigating into an undefined state. Every option/question
    // should define a `next` (or `otherOption.next`); if one is ever missing we
    // stay put rather than crash the wizard by rendering an undefined question.
    if (!nextQId || (nextQId !== 'REVIEW' && !questionMap[nextQId])) {
      console.error(`useWizard: no valid next question from "${currentQuestionId}" (resolved to "${nextQId}")`);
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestionId]: { value: finalValue, label: finalLabel, isOther },
    }));

    setHistory((prev) => [...prev, currentQuestionId]);
    setCurrentQuestionId(nextQId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQ, singleValue, otherText, multipleValues, isOtherSelected, textValue, currentQuestionId, questionMap]);

  const handleBack = useCallback(() => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const prevQ = newHistory.pop();
    setHistory(newHistory);
    setCurrentQuestionId(prevQ);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [history]);

  const toggleMultiple = useCallback((val) => {
    setMultipleValues((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }, []);

  const isNextDisabled = useMemo(() => {
    if (!currentQ) return false;
    if (currentQ.type === 'single') {
      return !singleValue || (singleValue === 'other' && !otherText.trim());
    }
    if (currentQ.type === 'multiple') {
      return multipleValues.length === 0 && (!isOtherSelected || !otherText.trim());
    }
    return false;
  }, [currentQ, singleValue, multipleValues, isOtherSelected, otherText]);

  return {
    // State
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
    // Actions
    setSingleValue,
    setMultipleValues,
    setOtherText,
    setIsOtherSelected,
    setTextValue,
    handleNext,
    handleBack,
    toggleMultiple,
  };
}
