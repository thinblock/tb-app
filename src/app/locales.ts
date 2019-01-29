import { injectIntl as inject, InjectIntlConfig } from 'react-intl';

const locales = [
  require('./modules/Dashboard/Desktop/i18n.json'),
  require('./modules/Dashboard/Mobile/i18n.json'),
];

const localeData = {
  en: {},
};

locales.forEach((locale) => {
  localeData.en = { ...localeData.en, ...locale.en };
});

const getLangWithoutCode = (lang) => lang.toLowerCase().split(/[_-]+/)[0];

export const getBrowserLanguage = () => {
  const documentLang = document.documentElement.lang;
  const navigatorObj = navigator as any;
  const language = (
    (navigatorObj.languages && navigatorObj.languages[0]) ||
    navigatorObj.language || navigatorObj.userLanguage
  );

  if (documentLang) {
    return documentLang;
  } else {
    document.documentElement.lang = getLangWithoutCode(language);
  }

  return language;
};

export const getLocaleMessages = (lang?: string) => {
  const language = lang || getBrowserLanguage();
  // Split locales with a region code
  const languageWithoutRegionCode = getLangWithoutCode(language);
  return localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;
};

export const injectIntl: any = (options: InjectIntlConfig) => (target: any) => {
  return inject(target, options);
};
