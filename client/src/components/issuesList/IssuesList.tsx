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
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Issue } from '../../models';
import { Project } from './../../models/project';
import { setQueryParam } from './../../shared';
import { ProjectsConsts, selectProject } from './../projectsList';
import {
  addIssue as addIssueToStore,
  getSingleProjectsAsync,
  updateIssue as updateIssueInStore,
} from './../projectsList/projectsSlice';
import { AddEditIssueDialog } from './AddEditIssueDialog';
import { addIssue, editIssue } from './issuesApi';
import { IssuesColumn } from './IssuesColumn';
import { IssuesConsts } from './issuesConsts';

export function IssuesList() {
  const { id: projectId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const project = useAppSelector((state) =>
    selectProject(state, projectId)
  ) as Project;

  const shouldSendRequest = !project || !Project.hasItems(project);
  const viewParams = getViewQueryParams();

  const openAddDialog = viewParams.addIssue && !viewParams.issueId;
  const issueForEdit = project?.issuesConnection?.items?.find(
    (i) => i.id === viewParams.issueId
  ) as Issue;

  const allIssues = project?.issuesConnection?.items ?? [];
  const notStartedIssues = getIssuesByStatus(allIssues, 'NOT_STARTED');
  const startedIssues = getIssuesByStatus(allIssues, 'IN_PROGRESS');
  const pausedIssues = getIssuesByStatus(allIssues, 'PAUSED');
  const completedIssues = getIssuesByStatus(allIssues, 'COMPLETED');

  useEffect(() => {
    if (!shouldSendRequest) {
      return;
    }
    dispatch(getSingleProjectsAsync(projectId));
  }, [dispatch, projectId, shouldSendRequest]);

  const handleEditDialogClose = async (result: boolean, issue: Issue) => {
    setQueryParam(history, IssuesConsts.IssueIdParam, null);

    if (result === true) {
      const editedIssue = await editIssue(issue);
      dispatch(updateIssueInStore({ projectId, issue: editedIssue }));
    }
  };

  const handleAddDialogClose = async (result: boolean, issue: Issue) => {
    setQueryParam(history, IssuesConsts.AddIssueParam, false);

    if (result === true) {
      const addedIssue = await addIssue(issue, project.id);
      dispatch(addIssueToStore({ issue: addedIssue, projectId: projectId }));
    }
  };

  const handleAddClick = () => {
    setQueryParam(history, IssuesConsts.AddIssueParam, true);
  };

  const handleEditClick = (issue: Issue) => {
    setQueryParam(history, IssuesConsts.IssueIdParam, issue.id);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 3, mb: 4, flexGrow: 1 }}>
          <PageBreadcrumbs project={project} />
        </Box>

        <Button
          variant="contained"
          color="success"
          sx={{ flexGrow: 0, alignSelf: 'center' }}
          endIcon={<AddIcon />}
          onClick={() => handleAddClick()}
        >
          Add Issue
        </Button>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <IssuesColumn
            header="Not started"
            issuesStatus="NOT_STARTED"
            issues={notStartedIssues}
            projectId={project?.id}
            onEditClick={handleEditClick}
          />
        </Grid>
        <Grid item xs={3}>
          <IssuesColumn
            header="In progress"
            issuesStatus="IN_PROGRESS"
            issues={startedIssues}
            projectId={project?.id}
            onEditClick={handleEditClick}
          />
        </Grid>
        <Grid item xs={3}>
          <IssuesColumn
            header="Paused"
            issuesStatus="PAUSED"
            issues={pausedIssues}
            projectId={project?.id}
            onEditClick={handleEditClick}
          />
        </Grid>
        <Grid item xs={3}>
          <IssuesColumn
            header="Completed"
            issuesStatus="COMPLETED"
            issues={completedIssues}
            projectId={project?.id}
            onEditClick={handleEditClick}
          />
        </Grid>
      </Grid>

      <AddEditIssueDialog
        issue={issueForEdit}
        mode="Edit"
        open={!!issueForEdit}
        onClose={handleEditDialogClose}
      ></AddEditIssueDialog>

      <AddEditIssueDialog
        mode="Add"
        open={openAddDialog}
        onClose={handleAddDialogClose}
      ></AddEditIssueDialog>
    </React.Fragment>
  );
}

const getIssuesByStatus = (issues: Issue[], status: Issue['status']) =>
  issues.filter((i) => i.status === status);

const getViewQueryParams = () => {
  const queryParams = qs.parse(window.location.search) as {
    issueId: string;
    addIssue: string;
  };
  return {
    issueId: queryParams?.issueId ?? '',
    addIssue: queryParams.addIssue?.toLocaleLowerCase() === 'true',
  };
};

export function PageBreadcrumbs(props: { project: Project }) {
  const { project } = props;

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        Demo App
      </Link>
      <Link
        underline="hover"
        color="inherit"
        component={RouterLink}
        to={`/projects?${ProjectsConsts.ProjectIdParam}=${project?.id}`}
      >
        {project?.name}
      </Link>
      <Typography color="text.primary">Issues</Typography>
    </Breadcrumbs>
  );
}
