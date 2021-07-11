import React from 'react';
import { useTranslation } from 'react-i18next';
import { PL, DEFAULT_LANGUAGE, OPTIONS } from 'shared/languageOption';
import { LANGUAGE_OPTION_TEST_ID, CHANGE_LANGUAGE_TEST_ID } from 'shared/testId';
import Option from 'components/Option';
import trans from './trans.json';

const getLanguageTrans = (language = DEFAULT_LANGUAGE) => (
  language === PL ? trans.PL : trans.EN
);

const getPropsOption = (translate, currentLanguage, handleClick) => (lang) => ({
  text: translate(getLanguageTrans(lang)),
  handleClick: handleClick(lang),
  selected: currentLanguage === lang,
  testId: `${LANGUAGE_OPTION_TEST_ID}_${lang}`,
});

const Language = () => {
  const { t: translate, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const handleClick = (lang) => () => i18n.changeLanguage(lang);
  const propsOption = getPropsOption(translate, currentLanguage, handleClick);

  return (
    <ul data-testid={CHANGE_LANGUAGE_TEST_ID}>
      {OPTIONS.map((option) => (
        <Option
          key={option}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsOption(option)}
        />
      ))}
    </ul>
  );
};

export default Language;
