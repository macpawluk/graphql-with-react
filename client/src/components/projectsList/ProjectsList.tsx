import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  createTheme,
  IconButton,
  Link,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Project } from '../../models';
import { MessageBox } from './../../shared/messageBox';
import { EditProjectDialog } from './EditProjectDialog';
import { removeProject } from './projectsApi';
import {
  getAllProjectsAsync,
  removeProject as removeProjectFromStore,
  selectProjectsState,
} from './projectsSlice';

//vvv introdce aliases for some areas, such as /shared/messageBox

export function ProjectsList() {
  const dispatch = useAppDispatch();
  const projectsState = useAppSelector(selectProjectsState);
  const projects = projectsState.items ?? [];

  useEffect(() => {
    if (projectsState.fetchedAll || projectsState.status === 'loading') {
      return;
    }

    dispatch(getAllProjectsAsync());
  }, [dispatch, projectsState.fetchedAll, projectsState.status]);

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Demo App
        </Link>
        <Typography color="text.primary">Projects</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map((p) => (
          <ProjectItem project={p} key={p.id} />
        ))}
      </Box>
    </React.Fragment>
  );
}

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

function ProjectItem(props: { project: Project }) {
  const { project } = props;
  const [openRemoveMessageBox, setOpenRemoveMessageBox] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteMessageBoxClose = async (result: boolean) => {
    setOpenRemoveMessageBox(false);

    if (result === true) {
      await removeProject(project.id);
      dispatch(removeProjectFromStore(project.id));
    }
  };

  const handleEditDialogClose = async (result: boolean) => {
    setOpenEditDialog(false);

    if (result) {
      // vvv send edit request
    }
  };

  const handleDeleteClick = () => {
    setOpenRemoveMessageBox(true);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ mb: 2, mr: 2, width: 270 }}>
        <CardContent sx={{ height: 120 }}>
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
        <CardActions>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <Button component={RouterLink} to={`/project/${project.id}`}>
                Open
              </Button>
            </div>

            <div style={{ display: 'flex' }}>
              <IconButton
                aria-label="edit"
                size="small"
                className="on-hover-show"
                onClick={handleEditClick}
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

      <EditProjectDialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
      ></EditProjectDialog>

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
