import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import thTranslation from './locales/th/translation.json';
import enTranslation from './locales/en/translation.json';
import deTranslation from './locales/de/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: thTranslation },
      en: { translation: enTranslation },
      de: { translation: deTranslation }
    },
    lng: 'th', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
