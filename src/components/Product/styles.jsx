import { indigo } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  element: {
    padding: '8px 0',
    '&:first-child': {
      marginTop: 24,
    },
    '& ~ &': {
      borderTop: `1px solid ${indigo[200]}`,
    },
  },
  name: {
    fontSize: '1.2rem',
    marginRight: 32,
  },
  input: {
    width: '100%',
  },
});
