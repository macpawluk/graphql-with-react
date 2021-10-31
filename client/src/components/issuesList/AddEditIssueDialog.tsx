import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { usePrevious } from '../../app/hooks';
import { Issue } from '../../models';
import { SlideTransition } from './../../shared/Transitions';

interface DialogProps {
  issue?: Issue;
  mode: 'Add' | 'Edit';
  open: boolean;
  onClose: (result: boolean, issue: Issue) => void;
}

interface DialogState {
  name: string;
  nameError: string;
  description: string;
  descriptionError: string;
  type: Issue['type'];
  status: Issue['status'];
}

const getInitState = (): DialogState => ({
  name: '',
  nameError: '',
  description: '',
  descriptionError: '',
  type: 'TASK',
  status: 'NOT_STARTED',
});

export function AddEditIssueDialog(props: DialogProps) {
  const { open, mode, onClose, issue } = props;

  const prevValues = usePrevious({ open, issue });
  const [dialogState, setDialogState] = useState<DialogState>(getInitState());

  useEffect(() => {
    if (open !== prevValues?.open) {
      if (open) {
        setDialogState({
          name: issue?.name ?? '',
          nameError: '',
          description: issue?.description ?? '',
          descriptionError: '',
          type: issue?.type ?? 'TASK',
          status: issue?.status ?? 'NOT_STARTED',
        });
      } else {
        setDialogState(getInitState());
      }
    }
  }, [issue, open]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasError = !!dialogState.nameError || !!dialogState.descriptionError;

  const title = mode === 'Add' ? 'Add Issue' : 'Edit Issue';

  const handleClose = (result: boolean) => {
    if (!onClose) {
      return;
    }

    if (result !== true) {
      onClose(false, issue as Issue);
      return;
    }

    const isValid = validateAll(dialogState);
    if (!isValid) {
      return;
    }

    const newIssue = {
      ...issue,
      name: dialogState.name,
      description: dialogState.description,
      type: dialogState.type,
      status: dialogState.status,
    };
    onClose(result, newIssue as Issue);
  };

  const handleNameChanged = (newValue: string) => {
    setDialogState({ ...validateName(dialogState, newValue), name: newValue });
  };

  const handleDescriptionChanged = (newValue: string) => {
    setDialogState({
      ...validateDescription(dialogState, newValue),
      description: newValue,
    });
  };

  const handleTypeChanged = (newValue: Issue['type']) => {
    setDialogState({
      ...dialogState,
      type: newValue,
    });
  };

  const handleStatusChanged = (newValue: Issue['status']) => {
    setDialogState({
      ...dialogState,
      status: newValue,
    });
  };

  const handleDialogKeyUp = (e: { keyCode: number }) => {
    const enter = 13;

    if (e.keyCode === enter) {
      handleClose(true);
    }
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

  const validateAll = (state: DialogState) => {
    let validatedState = validateName(state);
    validatedState = validateDescription(validatedState);

    setDialogState(validatedState);

    const { nameError, descriptionError } = validatedState;
    return !nameError && !descriptionError;
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
        <Box>
          <FormControl variant="standard" sx={{ width: 200, mb: 0.5 }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              value={dialogState.type}
              onChange={(e) =>
                handleTypeChanged(e.target.value as Issue['type'])
              }
              label="Type"
            >
              <MenuItem value="TASK">Task</MenuItem>
              <MenuItem value="STORY">Story</MenuItem>
              <MenuItem value="BUG">Bug</MenuItem>
              <MenuItem value="IMPROVEMENT">Improvement</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl variant="standard" sx={{ width: 200, mt: 1, mb: 0.5 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={dialogState.status}
              onChange={(e) =>
                handleStatusChanged(e.target.value as Issue['status'])
              }
              label="Status"
            >
              <MenuItem value="NOT_STARTED">Not Started</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="PAUSED">Paused</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          id="description"
          margin="dense"
          label="Description"
          value={dialogState.description}
          error={!!dialogState.descriptionError}
          helperText={dialogState.descriptionError}
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => handleDescriptionChanged(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ mx: 2, mt: 4, mb: 1 }}>
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
