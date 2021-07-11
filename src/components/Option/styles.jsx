import { makeStyles } from '@material-ui/core/styles';
import COLORS from 'shared/colors';

const UNDERLINE_STYLES = {
  content: "''",
  position: 'absolute',
  bottom: 0,
  height: 2,
};

export default makeStyles({
  button: {
    backgroundColor: COLORS.TRANSPARENT,
    borderColor: COLORS.TRANSPARENT,
  },
  option: {
    color: COLORS.WHITE,
    display: 'inline-block',
    listStyleType: 'none',
    paddingBottom: 2,
    position: 'relative',
    '&::before': {
      ...UNDERLINE_STYLES,
      left: '50%',
      transition: 'all 0.3s ease-out',
      width: 0,
    },
    '&:focus, &:hover, &:active': {
      '&::before': {
        backgroundColor: COLORS.WHITE,
        left: 0,
        width: '100%',
      },
    },
    '& ~ &': {
      marginLeft: 32,
    },
    '& > $button': {
      color: 'inherit',
      cursor: 'pointer',
      fontWeight: 'inherit',
      margin: -16,
      padding: 16,
    },
  },
  selected: {
    '&::before': {
      ...UNDERLINE_STYLES,
      backgroundColor: COLORS.WHITE,
      left: 0,
      width: '100%',
    },
    '& > $button': {
      cursor: 'default',
    },
  },
});
