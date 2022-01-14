import { Issue, IssueStatus, IssueType } from '@app/graphql-types';
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
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SlideTransition } from './../../shared/Transitions';

interface DialogProps {
  issue?: Issue;
  mode: 'Add' | 'Edit';
  open: boolean;
  onClose: (result: boolean, issue: Issue) => void;
}

type InputEventArgs = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function AddEditIssueDialog(props: DialogProps) {
  const { open, mode, onClose, issue } = props;
  const {
    handleTypeChanged,
    handleStatusChanged,
    handleNameChanged,
    handleDescriptionChanged,
    hasError,
    errors: { nameError, descriptionError },
    validateAll,
    editedIssueProps,
  } = useEditIssueForm({ issue: issue as Issue, open });

  const title = mode === 'Add' ? 'Add Issue' : 'Edit Issue';

  const handleClose = (result: boolean) => {
    if (!onClose) {
      return;
    }

    if (result !== true) {
      onClose(false, issue as Issue);
      return;
    }

    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    const editedIssue = {
      ...issue,
      ...editedIssueProps,
    } as Issue;

    onClose(result, editedIssue);
  };

  const handleDialogKeyUp = (e: { keyCode: number; target: any }) => {
    const enter = 13;

    if (e.keyCode === enter && e.target.type !== 'textarea') {
      handleClose(true);
    }
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
              value={editedIssueProps.type}
              onChange={handleTypeChanged}
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
              value={editedIssueProps.status}
              onChange={handleStatusChanged}
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
          value={editedIssueProps.name}
          error={!!nameError}
          helperText={nameError}
          type="text"
          fullWidth
          variant="standard"
          onChange={handleNameChanged}
        />
        <TextField
          id="description"
          margin="dense"
          label="Description"
          multiline
          minRows={3}
          value={editedIssueProps.description}
          error={!!descriptionError}
          helperText={descriptionError}
          type="text"
          fullWidth
          variant="standard"
          onChange={handleDescriptionChanged}
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

const useEditIssueForm = ({ issue, open }: { issue: Issue; open: boolean }) => {
  const [type, setType] = useState<Issue['type']>(
    issue?.type ?? IssueType.Task
  );
  const [status, setStatus] = useState<Issue['status']>(
    issue?.status ?? IssueStatus.NotStarted
  );
  const [name, setName] = useState(issue?.name ?? '');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState(issue?.description ?? '');
  const [descriptionError, setDescriptionError] = useState('');

  const hasError = !!nameError || !!descriptionError;

  const handleTypeChanged = (event: SelectChangeEvent<Issue['type']>) => {
    setType(event.target.value as Issue['type']);
  };

  const handleStatusChanged = (event: SelectChangeEvent<Issue['status']>) => {
    setStatus(event.target.value as Issue['status']);
  };

  const handleNameChanged = (event: InputEventArgs) => {
    const value = event.target.value;

    setName(value);
    setNameError(getNameError(value));
  };

  const handleDescriptionChanged = (event: InputEventArgs) => {
    const value = event.target.value;

    setDescription(value);
    setDescriptionError(getDescriptionError(value));
  };

  const validateAll = () => {
    const nameError = getNameError();
    const descriptionError = getDescriptionError();

    setNameError(nameError);
    setDescriptionError(descriptionError);

    return !nameError && !descriptionError;
  };

  const getNameError = (value?: string) => {
    const valueToValidate = value === undefined ? name : value;
    return !valueToValidate ? 'Name is required' : '';
  };

  const getDescriptionError = (value?: string) => {
    const valueToValidate = value === undefined ? description : value;
    return !valueToValidate ? 'Description is required' : '';
  };

  useEffect(() => {
    if (open) {
      setType(issue?.type ?? IssueType.Task);
      setStatus(issue?.status ?? IssueStatus.NotStarted);
      setName(issue?.name ?? '');
      setDescription(issue?.description ?? '');

      setNameError('');
      setDescriptionError('');
    }
  }, [issue, open]);

  return {
    errors: {
      nameError,
      descriptionError,
    },
    hasError,
    handleTypeChanged,
    handleStatusChanged,
    handleNameChanged,
    handleDescriptionChanged,
    validateAll,
    editedIssueProps: {
      type,
      status,
      name,
      description,
    },
  } as const;
};
