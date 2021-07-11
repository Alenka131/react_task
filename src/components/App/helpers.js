import { CARD_API } from 'shared/urlApi';

export const getProducts = () => fetch(CARD_API).then((response) => response.json());

export const getCalculation = (accumulator, currentValue) => {
  const itemPrice = currentValue.quantity * currentValue.price;
  return accumulator + itemPrice;
};
