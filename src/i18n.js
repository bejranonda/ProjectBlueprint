import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import thTranslation from './locales/th/translation.json';
import enTranslation from './locales/en/translation.json';
import deTranslation from './locales/de/translation.json';

const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';
const supportedLangs = ['en', 'th', 'de'];
const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: thTranslation },
      en: { translation: enTranslation },
      de: { translation: deTranslation }
    },
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
