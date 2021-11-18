import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { Project } from '../../models';
import { MessageBox } from './../../shared';
import { removeProjectAsync } from './projectsSlice';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          '& .on-hover-show': {
            display: 'none',
          },
          '&:hover .on-hover-show': {
            display: 'inline-flex',
          },
        },
      },
    },
  },
});

export function ProjectItem(props: {
  project: Project;
  onEditClick: (project: Project) => void;
}) {
  const { project, onEditClick } = props;
  const [openRemoveMessageBox, setOpenRemoveMessageBox] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteMessageBoxClose = async (result: boolean) => {
    setOpenRemoveMessageBox(false);

    if (result === true) {
      dispatch(removeProjectAsync(project.id));
    }
  };

  const handleDeleteClick = () => {
    setOpenRemoveMessageBox(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Project
              </Typography>
              <Typography variant="h5" component="div">
                {project.name}
              </Typography>
            </div>

            <Avatar
              sx={{
                bgcolor: project.color,
                width: 30,
                height: 30,
                fontSize: 12,
                flexGrow: 0,
              }}
            >
              {project.abbreviation}
            </Avatar>
          </div>
          <Typography variant="body2">{project.description}</Typography>
        </CardContent>
        <CardActions sx={{ flexGrow: 0 }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <Button
                component={RouterLink}
                to={`/project/${project.id}/issues`}
              >
                Open
              </Button>
            </div>

            <div style={{ display: 'flex' }}>
              <IconButton
                aria-label="edit"
                size="small"
                className="on-hover-show"
                onClick={() => onEditClick(project)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                className="on-hover-show"
                onClick={handleDeleteClick}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </CardActions>
      </Card>

      <MessageBox
        open={openRemoveMessageBox}
        header="Project"
        content={`Are you sure you want to permanently remove "${project.name}" project?`}
        okButtonCaption="Yes"
        okButtonColor="error"
        okButtonVariant="contained"
        cancelButtonCaption="No"
        onClose={handleDeleteMessageBoxClose}
      ></MessageBox>
    </ThemeProvider>
  );
}
