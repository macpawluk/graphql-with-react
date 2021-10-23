import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ColorResult, SliderPicker } from 'react-color';
import { usePrevious } from '../../app/hooks';
import { Project } from '../../models';
import { SlideTransition } from './../../shared/Transitions';

interface DialogProps {
  project?: Project;
  mode: 'Add' | 'Edit';
  open: boolean;
  onClose: (result: boolean, project: Project) => void;
}

interface DialogState {
  name: string;
  nameError: string;
  abbreviation: string;
  abbreviationError: string;
  description: string;
  descriptionError: string;
  color: string;
  colorPopoverAnchor?: HTMLButtonElement;
}

const defaultColor = '#4054bf';
const getInitState = () => ({
  name: '',
  nameError: '',
  abbreviation: '',
  abbreviationError: '',
  description: '',
  descriptionError: '',
  color: defaultColor,
});

export function AddEditProjectDialog(props: DialogProps) {
  const { open, mode, onClose, project } = props;

  const prevValues = usePrevious({ open, project });
  const [dialogState, setDialogState] = useState<DialogState>(getInitState());

  useEffect(() => {
    if (open !== prevValues?.open) {
      if (open) {
        setDialogState({
          name: project?.name ?? '',
          nameError: '',
          abbreviation: project?.abbreviation ?? '',
          abbreviationError: '',
          description: project?.description ?? '',
          descriptionError: '',
          color: project?.color ?? defaultColor,
        });
      } else {
        setDialogState(getInitState());
      }
    }
  }, [project, open]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasError =
    !!dialogState.nameError ||
    !!dialogState.abbreviationError ||
    !!dialogState.descriptionError;

  const title = mode === 'Add' ? 'Add Project' : 'Edit Project';

  const handleClose = (result: boolean) => {
    if (!onClose) {
      return;
    }

    if (result !== true) {
      onClose(false, project as Project);
      return;
    }

    const isValid = validateAll(dialogState);
    if (!isValid) {
      return;
    }

    const newProject = {
      ...project,
      name: dialogState.name,
      abbreviation: dialogState.abbreviation,
      description: dialogState.description,
      color: dialogState.color,
    };
    onClose(result, newProject as Project);
  };

  const handleNameChanged = (newValue: string) => {
    setDialogState({ ...validateName(dialogState, newValue), name: newValue });
  };

  const handleAbbreviationChanged = (newValue: string) => {
    setDialogState({
      ...validateAbbreviation(dialogState, newValue),
      abbreviation: newValue,
    });
  };

  const handleDescriptionChanged = (newValue: string) => {
    setDialogState({
      ...validateDescription(dialogState, newValue),
      description: newValue,
    });
  };

  const handleDialogKeyUp = (e: { keyCode: number }) => {
    const enter = 13;

    if (e.keyCode === enter) {
      handleClose(true);
    }
  };

  const handleColorChange = (result: ColorResult) => {
    setDialogState({
      ...dialogState,
      color: result.hex,
    });
  };

  const handleOpenColorPopover = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDialogState({
      ...dialogState,
      colorPopoverAnchor: event.currentTarget,
    });
  };

  const handleCloseColorPopover = () => {
    setDialogState({
      ...dialogState,
      colorPopoverAnchor: undefined,
    });
  };

  const validateName = (state: DialogState, value?: string): DialogState => {
    const name = value !== undefined ? value : state.name;
    const error = !name ? 'Name is required' : '';

    return {
      ...state,
      nameError: error,
    };
  };

  const validateDescription = (
    state: DialogState,
    value?: string
  ): DialogState => {
    const description = value !== undefined ? value : state.description;
    const error = !description ? 'Description is required' : '';

    return {
      ...state,
      descriptionError: error,
    };
  };

  const validateAbbreviation = (
    state: DialogState,
    value?: string
  ): DialogState => {
    const abbreviation = value !== undefined ? value : state.abbreviation;
    let error = !abbreviation ? 'Abbreviation is required' : '';
    if (abbreviation.length > 2) {
      error = 'Abbreviation cannot have more than 2 characters';
    }

    return {
      ...state,
      abbreviationError: error,
    };
  };

  const validateAll = (state: DialogState) => {
    let validatedState = validateName(state);
    validatedState = validateDescription(validatedState);
    validatedState = validateAbbreviation(validatedState);

    setDialogState(validatedState);

    const { nameError, descriptionError, abbreviationError } = validatedState;
    return !nameError && !descriptionError && !abbreviationError;
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideTransition}
      maxWidth="sm"
      fullWidth={true}
      keepMounted
      onClose={handleClose}
      onKeyUp={handleDialogKeyUp}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="name"
          margin="dense"
          label="Name"
          value={dialogState.name}
          error={!!dialogState.nameError}
          helperText={dialogState.nameError}
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => handleNameChanged(e.target.value)}
        />
        <TextField
          id="abbreviation"
          margin="dense"
          label="Abbreviation"
          value={dialogState.abbreviation}
          error={!!dialogState.abbreviationError}
          helperText={dialogState.abbreviationError}
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => handleAbbreviationChanged(e.target.value)}
        />
        <TextField
          id="description"
          margin="dense"
          label="Description"
          value={dialogState.description}
          error={!!dialogState.descriptionError}
          helperText={dialogState.descriptionError}
          type="text"
          fullWidth
          variant="standard"
          sx={{ mb: 2 }}
          onChange={(e) => handleDescriptionChanged(e.target.value)}
        />

        <InputLabel shrink={true} htmlFor="colorPicker">
          Color
        </InputLabel>
        <Button variant="outlined" onClick={(e) => handleOpenColorPopover(e)}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: dialogState.color,
                borderRadius: 3,
              }}
            ></div>
            <Typography sx={{ ml: 1 }} fontSize="small">
              Change
            </Typography>
          </div>
        </Button>
        <Popover
          id="simple-popover"
          open={!!dialogState.colorPopoverAnchor}
          anchorEl={dialogState.colorPopoverAnchor}
          onClose={handleCloseColorPopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ width: 300, padding: 2 }}>
            <SliderPicker
              key="colorPicker"
              color={dialogState.color}
              onChange={handleColorChange}
            />
          </Box>
        </Popover>
      </DialogContent>
      <DialogActions sx={{ mx: 2, mt: 2, mb: 1 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={hasError}
          sx={{ minWidth: 90 }}
          onClick={() => handleClose(true)}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          sx={{ minWidth: 90 }}
          onClick={() => handleClose(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
