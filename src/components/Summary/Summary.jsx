import React, { useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BASKET_PRICE_TEST_ID } from 'shared/testId';
import priceFormat from 'helpers/priceFormat';
import CurrencyContext from 'configurations/currency/CurrencyContext';
import BasketContext from 'configurations/basket/BasketContext';
import trans from './trans.json';

const Summary = () => {
  const { t: translate, i18n: { language: currentLanguage } } = useTranslation();
  const { currencyLabel } = useContext(CurrencyContext);
  const { getBasketSummary } = useContext(BasketContext);
  const price = getBasketSummary();

  return (
    <Box mx={2}>
      <Typography variant="h5" component="p" align="center">
        {`${translate(trans.SUMMARY)}:`}
        &nbsp;
        <Typography
          align="center"
          color="secondary"
          component="span"
          data-testid={BASKET_PRICE_TEST_ID}
          noWrap
          variant="h4"
        >
          {`${priceFormat(price)(currentLanguage)} ${currencyLabel}`}
        </Typography>
      </Typography>
    </Box>
  );
};

export default Summary;
