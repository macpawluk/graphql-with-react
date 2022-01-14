import {
  ProjectsQueryResponse,
  useAddProjectMutation,
  useUpdateProjectMutation,
} from '@app/api';
import { useGetProjectsQuery } from '@app/graphql-hooks';
import { Project, ProjectExt } from '@app/graphql-types';
import { NoResultsPlaceholder } from '@app/shared';
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
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { setQueryParam } from './../../shared';
import { AddEditProjectDialog } from './AddEditProjectDialog';
import { ProjectItem } from './ProjectItem';
import { ProjectsConsts } from './projectsConsts';

export function ProjectsList() {
  const history = useHistory();

  const viewParams = getViewQueryParams();
  const openAddDialog = viewParams.addProject && !viewParams.projectId;

  const { data: queryData, loading: queryLoading } = useGetProjectsQuery();
  const { callback: addProjectCallback } = useAddProjectMutation();
  const { callback: updateProjectCallback } = useUpdateProjectMutation();

  const projects = (queryData as ProjectsQueryResponse)?.projects ?? [];
  const hasAnyProject = projects.length > 0;

  const projectForEdit = projects.find(
    (p) => p.id === viewParams.projectId
  ) as Project;

  const handleEditDialogClose = async (result: boolean, project: Project) => {
    setQueryParam(history, ProjectsConsts.ProjectIdParam, null);

    if (result === true) {
      updateProjectCallback({
        variables: { project: ProjectExt.toProjectInput(project) },
      });
    }
  };

  const handleAddDialogClose = async (result: boolean, project: Project) => {
    setQueryParam(history, ProjectsConsts.AddProjectParam, false);

    if (result === true) {
      addProjectCallback({
        variables: { project: ProjectExt.toProjectInput(project) },
      });
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
            Showcase App
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

      {!hasAnyProject && !queryLoading && (
        <Box sx={{ marginTop: 20 }}>
          <NoResultsPlaceholder text="I am so empty. Add something here…" />
        </Box>
      )}

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
