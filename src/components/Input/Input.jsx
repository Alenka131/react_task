import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import {
  ButtonGroup, Typography, Button, Box,
} from '@material-ui/core';
import { ADD_REMOVE_ITEM_UNIT, MIN_ITEM_QUANTITY } from 'shared/basketOption';
import { ADD_ITEM_BUTTON_TEST_ID, REMOVE_ITEM_BUTTON_TEST_ID, PRODUCT_QUANTITY_TEST_ID } from 'shared/testId';
import BasketContext from 'configurations/basket/BasketContext';
import { getQuantityTrans, checkQuantity, getErrorTrans } from './helpers';
import DEBOUNCE_TIME from './constants';

const Input = ({
  min,
  max,
  isBlocked,
  pid,
}) => {
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { setProductToBasket } = useContext(BasketContext);
  const setQuantityInBasket = setProductToBasket(pid);
  const [quantity, setQuantity] = useState(min);
  const handleAddItem = () => setQuantity((prevState) => {
    const newState = prevState + ADD_REMOVE_ITEM_UNIT;
    return newState > max ? prevState : newState;
  });
  const handleRemoveItem = () => setQuantity((prevState) => {
    const newState = prevState - ADD_REMOVE_ITEM_UNIT;
    return newState < min ? prevState : newState;
  });

  const disableAddItemButton = isBlocked || quantity + ADD_REMOVE_ITEM_UNIT > max;
  const disableRemoveItemButton = isBlocked || quantity - ADD_REMOVE_ITEM_UNIT < min;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verify = useCallback(debounce((value) => {
    checkQuantity(pid, value).then((response) => {
      if (response.isError) {
        throw new Error(response.errorType);
      } else {
        setQuantityInBasket(value);
      }
    }).catch((error) => {
      const errorTrans = getErrorTrans(error.message);
      enqueueSnackbar(translate(errorTrans));
      setQuantity(min);
    });
  }, DEBOUNCE_TIME),
  []);

  useEffect(() => verify(quantity), [quantity, verify]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      my={1}
      flexWrap={{ xs: 'wrap', sm: 'no-wrap' }}
    >
      {quantity > 0 && (
        <Typography variant="body2" data-testid={PRODUCT_QUANTITY_TEST_ID}>
          {translate(getQuantityTrans(quantity), { quantity })}
        </Typography>
      )}
      <Box ml={2} my={1}>
        <ButtonGroup size="small" disableElevation color="secondary">
          <Button
            onClick={handleAddItem}
            disabled={disableAddItemButton}
            data-testid={ADD_ITEM_BUTTON_TEST_ID}
          >
            +
          </Button>
          <Button
            onClick={handleRemoveItem}
            disabled={disableRemoveItemButton}
            data-testid={REMOVE_ITEM_BUTTON_TEST_ID}
          >
            -
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

Input.defaultProps = {
  isBlocked: false,
  max: Infinity,
  min: MIN_ITEM_QUANTITY,
};

Input.propTypes = {
  pid: PropTypes.string.isRequired,
  isBlocked: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
};

export default Input;
