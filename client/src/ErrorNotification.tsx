import { makeStyles } from '@material-ui/core/styles';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { red } from '@mui/material/colors';
import './App.css';

const useStyles = makeStyles({
  alert: {
    color: 'white',
    backgroundColor: red['400'],
    '& .MuiAlert-icon': {
      color: 'white',
    },
  },
});

export function ErrorNotification(props: {
  errorMessage: string;
  open: boolean;
  onClose?: () => void;
}) {
  const { errorMessage, open, onClose } = props;
  const classes = useStyles();

  const handleClose = (reason: SnackbarCloseReason) => {
    if (!onClose || reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={(_, reason) => handleClose(reason)}
      message={errorMessage}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity="error"
        onClose={onClose}
        className={classes.alert}
        sx={{ width: '100%' }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
