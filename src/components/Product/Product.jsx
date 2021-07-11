import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  PRODUCT_TEST_ID,
  PRODUCT_NAME_TEST_ID,
  PRODUCT_PRICE_TEST_ID,
} from 'shared/testId';
import { MIN_ITEM_QUANTITY } from 'shared/basketOption';
import priceFormat from 'helpers/priceFormat';
import CurrencyContext from 'configurations/currency/CurrencyContext';
import Input from 'components/Input';
import useStyles from './styles';

const Product = ({
  isBlocked,
  max,
  min,
  name,
  pid,
  price,
}) => {
  const { currencyLabel } = useContext(CurrencyContext);
  const classes = useStyles();
  const { i18n: { language: currentLanguage } } = useTranslation();

  const nameRender = () => (
    <dt className={classes.name}>
      <Typography data-testid={PRODUCT_NAME_TEST_ID}>
        {name}
      </Typography>
    </dt>
  );

  const priceRender = () => (
    <dd>
      <Typography data-testid={PRODUCT_PRICE_TEST_ID} noWrap>
        {`${priceFormat(price)(currentLanguage)} ${currencyLabel}`}
      </Typography>
    </dd>
  );

  const inputRender = () => (
    <dd className={classes.input}>
      <Input {...{
        isBlocked,
        max,
        min,
        pid,
      }}
      />
    </dd>
  );

  return (
    <li className={classes.element} data-testid={PRODUCT_TEST_ID}>
      <Box
        component="dl"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        {nameRender()}
        {priceRender()}
        {inputRender()}
      </Box>
    </li>
  );
};

Product.defaultProps = {
  isBlocked: false,
  max: Infinity,
  min: MIN_ITEM_QUANTITY,
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isBlocked: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
};

export default Product;
