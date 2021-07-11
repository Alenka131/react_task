import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CurrencyContext from 'configurations/currency/CurrencyContext';
import { PLN, DEFAULT_CURRENCY, OPTIONS } from 'shared/currencyOption';
import { CHANGE_CURRENCY_TEST_ID, CURRENCY_OPTION_TEST_ID } from 'shared/testId';
import Option from 'components/Option';
import trans from './trans.json';

const getCurrencyTrans = (currency = DEFAULT_CURRENCY) => (
  currency === PLN ? trans.PLN : trans.USD
);

const getPropsOption = (translate, currentCurrency, setCurrency) => (currency) => ({
  text: translate(getCurrencyTrans(currency)),
  handleClick: () => setCurrency(currency),
  selected: currentCurrency === currency,
  testId: `${CURRENCY_OPTION_TEST_ID}_${currency}`,
});

const Currency = () => {
  const { t: translate } = useTranslation();
  const { currency: currentCurrency, setCurrency } = useContext(CurrencyContext);
  const propsOption = getPropsOption(translate, currentCurrency, setCurrency);

  return (
    <ul data-testid={CHANGE_CURRENCY_TEST_ID}>
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

export default Currency;
