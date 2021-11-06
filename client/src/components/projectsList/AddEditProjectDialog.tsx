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
import React, { useEffect, useState } from 'react';
import { ColorResult, SliderPicker } from 'react-color';
import { Project } from '../../models';
import { SlideTransition } from './../../shared/Transitions';

interface DialogProps {
  project?: Project;
  mode: 'Add' | 'Edit';
  open: boolean;
  onClose: (result: boolean, project: Project) => void;
}

type InputEventArgs = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
const defaultColor = '#4054bf';

export function AddEditProjectDialog(props: DialogProps) {
  const { open, mode, onClose, project } = props;
  const [colorPopoverAnchor, setColorPopoverAnchor] = useState<
    HTMLButtonElement | undefined
  >(undefined);
  const {
    handleNameChanged,
    handleAbbreviationChanged,
    handleColorChange,
    handleDescriptionChanged,
    hasError,
    errors: { nameError, abbreviationError, descriptionError },
    validateAll,
    editedProjectProps,
  } = useEditProjectForm({ project: project as Project, open });

  const title = mode === 'Add' ? 'Add Project' : 'Edit Project';

  const handleClose = (result: boolean) => {
    if (!onClose) {
      return;
    }

    if (result !== true) {
      onClose(false, project as Project);
      return;
    }

    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    const editedProject = {
      ...project,
      ...editedProjectProps,
    } as Project;

    onClose(result, editedProject);
  };

  const handleDialogKeyUp = (e: { keyCode: number }) => {
    const enter = 13;

    if (e.keyCode === enter) {
      handleClose(true);
    }
  };

  const handleOpenColorPopover = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setColorPopoverAnchor(event.currentTarget);
  };

  const handleCloseColorPopover = () => {
    setColorPopoverAnchor(undefined);
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
          value={editedProjectProps.name}
          error={!!nameError}
          helperText={nameError}
          type="text"
          fullWidth
          variant="standard"
          onChange={handleNameChanged}
        />
        <TextField
          id="abbreviation"
          margin="dense"
          label="Abbreviation"
          value={editedProjectProps.abbreviation}
          error={!!abbreviationError}
          helperText={abbreviationError}
          type="text"
          fullWidth
          variant="standard"
          onChange={handleAbbreviationChanged}
        />
        <TextField
          id="description"
          margin="dense"
          label="Description"
          value={editedProjectProps.description}
          error={!!descriptionError}
          helperText={descriptionError}
          type="text"
          fullWidth
          variant="standard"
          sx={{ mb: 2 }}
          onChange={handleDescriptionChanged}
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
                backgroundColor: editedProjectProps.color,
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
          open={!!colorPopoverAnchor}
          anchorEl={colorPopoverAnchor}
          onClose={handleCloseColorPopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ width: 300, padding: 2 }}>
            <SliderPicker
              key="colorPicker"
              color={editedProjectProps.color}
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

const useEditProjectForm = ({
  project,
  open,
}: {
  project: Project;
  open: boolean;
}) => {
  const [name, setName] = useState(project?.name ?? '');
  const [nameError, setNameError] = useState('');
  const [abbreviation, setAbbreviation] = useState(project?.abbreviation ?? '');
  const [abbreviationError, setAbbreviationError] = useState('');
  const [description, setDescription] = useState(project?.description ?? '');
  const [descriptionError, setDescriptionError] = useState('');
  const [color, setColor] = useState(project?.color ?? defaultColor);

  const hasError = !!nameError || !!abbreviationError || !!descriptionError;

  const handleNameChanged = (event: InputEventArgs) => {
    const value = event.target.value;

    setName(value);
    setNameError(getNameError(value));
  };

  const handleAbbreviationChanged = (event: InputEventArgs) => {
    const value = event.target.value;

    setAbbreviation(value);
    setAbbreviationError(getAbbreviationError(value));
  };

  const handleDescriptionChanged = (event: InputEventArgs) => {
    const value = event.target.value;

    setDescription(value);
    setDescriptionError(getDescriptionError(value));
  };

  const handleColorChange = (result: ColorResult) => {
    setColor(result.hex);
  };

  const validateAll = () => {
    const nameError = getNameError();
    const abbreviationError = getAbbreviationError();
    const descriptionError = getDescriptionError();

    setNameError(nameError);
    setAbbreviationError(abbreviationError);
    setDescriptionError(descriptionError);

    return !nameError && !abbreviationError && !descriptionError;
  };

  const getNameError = (value?: string) => {
    const valueToValidate = value === undefined ? name : value;
    return !valueToValidate ? 'Name is required' : '';
  };

  const getAbbreviationError = (value?: string) => {
    const valueToValidate = value === undefined ? abbreviation : value;
    if (!valueToValidate) {
      return 'Abbreviation is required';
    }
    if (valueToValidate.length > 2) {
      return 'Abbreviation cannot have more than 2 characters';
    }
    return '';
  };

  const getDescriptionError = (value?: string) => {
    const valueToValidate = value === undefined ? description : value;
    return !valueToValidate ? 'Description is required' : '';
  };

  useEffect(() => {
    if (open) {
      setName(project?.name ?? '');
      setAbbreviation(project?.abbreviation ?? '');
      setDescription(project?.description ?? '');
      setColor(project?.color ?? defaultColor);

      setNameError('');
      setAbbreviationError('');
      setDescriptionError('');
    }
  }, [project, open]);

  return {
    errors: {
      nameError,
      abbreviationError,
      descriptionError,
    },
    hasError,
    handleNameChanged,
    handleAbbreviationChanged,
    handleDescriptionChanged,
    handleColorChange,
    validateAll,
    editedProjectProps: {
      name,
      abbreviation,
      description,
      color,
    },
  } as const;
};
