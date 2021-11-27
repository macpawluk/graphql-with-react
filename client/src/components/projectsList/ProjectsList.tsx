import { Project } from '@app/models';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import qs from 'query-string';
import React, { useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQueryParam } from './../../shared';
import { AddEditProjectDialog } from './AddEditProjectDialog';
import { ProjectItem } from './ProjectItem';
import { ProjectsConsts } from './projectsConsts';
import {
  addProjectAsync,
  getAllProjectsAsync,
  selectProjectsState,
  updateProjectAsync,
} from './projectsSlice';

export function ProjectsList() {
  const dispatch = useAppDispatch();
  const projectsState = useAppSelector(selectProjectsState);
  const history = useHistory();

  const projects = projectsState.items ?? [];
  const viewParams = getViewQueryParams();
  const isLoading = projectsState.status === 'loading';

  const openAddDialog = viewParams.addProject && !viewParams.projectId;
  const projectForEdit = projects.find(
    (p) => p.id === viewParams.projectId
  ) as Project;

  useEffect(() => {
    if (projectsState.fetchedAll || isLoading) {
      return;
    }

    dispatch(getAllProjectsAsync());
  }, [dispatch, projectsState.fetchedAll, isLoading]);

  const handleEditDialogClose = async (result: boolean, project: Project) => {
    setQueryParam(history, ProjectsConsts.ProjectIdParam, null);

    if (result === true) {
      dispatch(updateProjectAsync(project));
    }
  };

  const handleAddDialogClose = async (result: boolean, project: Project) => {
    setQueryParam(history, ProjectsConsts.AddProjectParam, false);

    if (result === true) {
      dispatch(addProjectAsync(project));
    }
  };

  const handleAddClick = () => {
    setQueryParam(history, ProjectsConsts.AddProjectParam, true);
  };

  const handleEditClick = (project: Project) => {
    setQueryParam(history, ProjectsConsts.ProjectIdParam, project.id);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 3, mb: 4, flexGrow: 1 }}>
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            Demo App
          </Link>
          <Typography color="text.primary">Projects</Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          color="success"
          sx={{ flexGrow: 0, alignSelf: 'center' }}
          endIcon={<AddIcon />}
          onClick={() => handleAddClick()}
        >
          Add New
        </Button>
      </Box>

      <Grid container spacing={2}>
        {projects.map((p) => (
          <Grid item xs={3} sx={{ height: 220 }} key={p.id}>
            <ProjectItem project={p} onEditClick={handleEditClick} />
          </Grid>
        ))}
      </Grid>

      <AddEditProjectDialog
        project={projectForEdit}
        mode="Edit"
        open={!!projectForEdit}
        onClose={handleEditDialogClose}
      ></AddEditProjectDialog>

      <AddEditProjectDialog
        mode="Add"
        open={openAddDialog}
        onClose={handleAddDialogClose}
      ></AddEditProjectDialog>
    </React.Fragment>
  );
}

const getViewQueryParams = () => {
  const queryParams = qs.parse(window.location.search) as {
    projectId: string;
    addProject: string;
  };
  return {
    projectId: queryParams?.projectId ?? '',
    addProject: queryParams.addProject?.toLocaleLowerCase() === 'true',
  };
};
