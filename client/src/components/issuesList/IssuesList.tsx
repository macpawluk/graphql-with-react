import AddIcon from '@mui/icons-material/Add';
import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material';
import qs from 'query-string';
import React, { useEffect } from 'react';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Issue } from '../../models';
import { Project } from './../../models/project';
import { setQueryParam } from './../../shared';
import { ProjectsConsts, selectProject } from './../projectsList';
import {
  getSingleProjectsAsync,
  addIssue as addIssueToStore,
  updateIssue as updateIssueInStore,
} from './../projectsList/projectsSlice';
import { AddEditIssueDialog } from './AddEditIssueDialog';
import { IssueItem } from './IssueItem';
import { addIssue, editIssue } from './issuesApi';
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

      <Box>
        {Project.hasItems(project) &&
          project.issuesConnection.items.map((i) => (
            <IssueItem
              key={i.id}
              issue={i}
              projectId={project.id}
              onEditClick={handleEditClick}
            />
          ))}
      </Box>

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
