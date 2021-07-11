import React, { useEffect, useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Box,
} from '@material-ui/core';
import CurrencyContext from 'configurations/currency/CurrencyContext';
import BasketContext from 'configurations/basket/BasketContext';
import { DEFAULT_CURRENCY, PLN } from 'shared/currencyOption';
import { DEFAULT_BASKET_SUMMARY } from 'shared/basketOption';
import { PRODUCT_LIST_TEST_ID, MENU_TEST_ID, LOADING_TEST_ID } from 'shared/testId';
import Language from 'components/Language';
import Currency from 'components/Currency';
import Product from 'components/Product';
import Summary from 'components/Summary';
import './App.css';
import { getProducts, getCalculation } from './helpers';
import trans from './trans.json';
import theme from './theme';

const App = () => {
  const { t: translate } = useTranslation();

  const [products, setProducts] = useState([]);
  useEffect(() => getProducts().then(setProducts), []);

  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const currencyTrans = currency === PLN ? trans.PLN_LABEL : trans.USD_LABEL;
  const currencyLabel = translate(currencyTrans);

  const [basket, setBasket] = useState([]);
  useEffect(() => setBasket(
    products.map(({ pid, min, price }) => ({ pid, price, quantity: min })),
  ), [products]);
  const setProductToBasket = (pid) => (quantity) => (
    setBasket((prevState) => {
      const newState = prevState;
      const productInfo = products.find((product) => product.pid === pid);
      if (!productInfo) return prevState;

      const search = newState.find((element) => element.pid === pid);
      if (search) {
        if (search.quantity === quantity) return prevState;
        search.quantity = quantity;
      } else {
        newState.push({ pid, quantity, price: productInfo.price });
      }

      return [...newState];
    })
  );

  const getBasketSummary = () => basket.reduce(getCalculation, DEFAULT_BASKET_SUMMARY);

  const productsRender = () => (
    products.map(({
      isBlocked,
      max,
      min,
      name,
      pid,
      price,
    }) => (
      <Product
        {...{
          isBlocked,
          max,
          min,
          name,
          pid,
          price,
        }}
        key={pid}
      />
    ))
  );

  const loadingRender = () => (
    <Grid item xs={12}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        data-testid={LOADING_TEST_ID}
      >
        {translate(trans.LOADING)}
      </Typography>
    </Grid>
  );

  const basketRender = () => (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" component="h2" align="center">
          {translate(trans.HEADER)}
        </Typography>
        <ul data-testid={PRODUCT_LIST_TEST_ID}>
          {productsRender()}
        </ul>
      </Grid>
      <Grid item xs={12}>
        <Summary />
      </Grid>
    </Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CurrencyContext.Provider value={{ currency, currencyLabel, setCurrency }}>
          <BasketContext.Provider value={{ setProductToBasket, getBasketSummary }}>
            <AppBar position="static" data-testid={MENU_TEST_ID}>
              <Box component={Toolbar} justifyContent="space-between">
                <Language />
                <Currency />
              </Box>
            </AppBar>
            <Box mt={4} mx={2}>
              <Grid
                container
                spacing={4}
                justify="center"
                alignItems="center"
              >
                {products.length > 0 ? basketRender() : loadingRender()}
              </Grid>
            </Box>
          </BasketContext.Provider>
        </CurrencyContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
