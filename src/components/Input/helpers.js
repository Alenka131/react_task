import { PRODUCT_CHECK_API } from 'shared/urlApi';
import { INCORRECT_QUANTITY, NOT_FOUND, INCORRECT_TYPE } from 'shared/errorType';
import trans from './trans.json';

export const getQuantityTrans = (quantity) => {
  if (quantity === 1) {
    return trans.PRODUCT_QUANTITY_1;
  }

  return quantity >= 5 ? trans.PRODUCT_QUANTITY_5 : trans.PRODUCT_QUANTITY_2__4;
};

export const getErrorTrans = (error = INCORRECT_TYPE) => {
  if (error === NOT_FOUND) {
    return trans.ERROR.NOT_FOUND_PRODUCT;
  }

  return (
    error === INCORRECT_QUANTITY
      ? trans.ERROR.INCORRECT_QUANTITY
      : trans.ERROR.SOMETHING_WENT_WRONG
  );
};

export const checkQuantity = (pid, quantity) => fetch(PRODUCT_CHECK_API, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ pid, quantity }),
}).then((response) => response.json());
