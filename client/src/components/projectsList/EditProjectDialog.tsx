import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { SlideTransition } from './../../shared/Transitions';

export function EditProjectDialog(props: {
  open: boolean;
  onClose: (result: boolean) => void;
}) {
  const { open, onClose } = props;

  const handleClose = (result: boolean) => {
    if (!onClose) {
      return;
    }
    onClose(result);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideTransition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Modify me
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClose(true)}
        >
          Save
        </Button>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
