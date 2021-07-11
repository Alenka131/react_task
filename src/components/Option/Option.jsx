import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useStyles from './styles';

const Option = ({
  handleClick,
  text,
  selected,
  testId,
}) => {
  const classes = useStyles();

  const optionClassName = clsx({
    [classes.option]: true,
    [classes.selected]: selected,
  });

  return (
    <li className={optionClassName} data-testid={testId}>
      <button
        type="button"
        className={classes.button}
        onClick={handleClick}
      >
        {text}
      </button>
    </li>
  );
};

Option.defaultProps = {
  selected: false,
};

Option.propTypes = {
  handleClick: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

export default Option;
