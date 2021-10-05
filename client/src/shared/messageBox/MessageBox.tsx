import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  SlideProps,
} from '@mui/material';
import * as React from 'react';

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function MessageBox(props: {
  open: boolean;
  header: string;
  content: string;
  okButtonCaption?: string;
  okButtonColor?: ButtonProps['color'];
  okButtonVariant?: ButtonProps['variant'];
  cancelButtonCaption?: string;
  cancelButtonColor?: ButtonProps['color'];
  cancelButtonVariant?: ButtonProps['variant'];
  onClose: (result: boolean) => void;
}) {
  const { open, header, content, okButtonColor, cancelButtonColor, onClose } =
    props;
  let {
    okButtonCaption: okCaption,
    cancelButtonCaption: cancelCaption,
    okButtonVariant: okVariant,
    cancelButtonVariant: cancelVariant,
  } = props;

  okCaption = okCaption == null ? 'OK' : okCaption;
  cancelCaption = cancelCaption == null ? 'Cancel' : cancelCaption;

  okVariant = okVariant == null ? 'outlined' : okVariant;
  cancelVariant = cancelVariant == null ? 'outlined' : cancelVariant;

  const handleClose = (result: boolean) => {
    if (!onClose) {
      return;
    }
    onClose(result);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button
          variant={okVariant}
          color={okButtonColor}
          onClick={() => handleClose(true)}
        >
          {okCaption}
        </Button>
        <Button
          variant={cancelVariant}
          color={cancelButtonColor}
          onClick={() => handleClose(false)}
        >
          {cancelCaption}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
