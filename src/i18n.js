import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE } from 'shared/languageOption';
import DICTIONARY_PL from 'translations/pl.json';
import DICTIONARY_EN from 'translations/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: { ...DICTIONARY_PL },
      },
      en: {
        translation: { ...DICTIONARY_EN },
      },
    },
    keySeparator: false,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });
