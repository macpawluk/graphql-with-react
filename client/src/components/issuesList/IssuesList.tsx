import { Issue, Project } from '@app/models';
import { NoResultsPlaceholder } from '@app/shared';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Breadcrumbs,
  Button,
  Fade,
  Grid,
  Link,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import qs from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUsedDragAndDrop } from './../../appLocalStorage';
import { setQueryParam } from './../../shared';
import { ProjectsConsts, selectProject } from './../projectsList';
import {
  addIssueAsync,
  getSingleProjectAsync,
  selectProjectsState,
  updateIssueAsync,
} from './../projectsList/projectsSlice';
import { AddEditIssueDialog } from './AddEditIssueDialog';
import { IssuesColumn } from './IssuesColumn';
import { IssuesConsts } from './issuesConsts';

export function IssuesList() {
  const { id: projectId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const project = useAppSelector((state) =>
    selectProject(state, projectId)
  ) as Project;
  const [tipShown, setTipShown] = useState(false);
  const isLoading = useAppSelector(selectProjectsState).status === 'loading';

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
  const hasAnyIssues = allIssues.length > 0;
  const usedDnd = getUsedDragAndDrop();

  useEffect(() => {
    if (!shouldSendRequest) {
      return;
    }
    dispatch(getSingleProjectAsync(projectId));
  }, [dispatch, projectId, shouldSendRequest]);

  const handleEditDialogClose = async (result: boolean, issue: Issue) => {
    setQueryParam(history, IssuesConsts.IssueIdParam, null);

    if (result === true) {
      dispatch(updateIssueAsync({ issue, projectId }));
    }
  };

  const handleAddDialogClose = async (result: boolean, issue: Issue) => {
    setQueryParam(history, IssuesConsts.AddIssueParam, false);

    if (result === true) {
      dispatch(addIssueAsync({ issue, projectId: project.id }));
    }
  };

  const handleAddClick = () => {
    setQueryParam(history, IssuesConsts.AddIssueParam, true);
  };

  const handleEditClick = (issue: Issue) => {
    setQueryParam(history, IssuesConsts.IssueIdParam, issue.id);
  };

  const handleTipShown = () => {
    setTipShown(true);
  };

  const cardsGridRef = useRef(null);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 3, mb: 4, flexGrow: 0 }}>
          <PageBreadcrumbs project={project} />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignSelf: 'center',
            flexDirection: 'column',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignSelf: 'center' }}>
            {hasAnyIssues && !tipShown && !usedDnd && (
              <AnimatedTip
                text="Drag & Drop cards"
                container={cardsGridRef}
                onTipShown={handleTipShown}
              ></AnimatedTip>
            )}
          </Stack>
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

      {hasAnyIssues && (
        <Grid container spacing={1} ref={cardsGridRef}>
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
      )}

      {!hasAnyIssues && !isLoading && (
        <Box sx={{ marginTop: 20 }}>
          <NoResultsPlaceholder text="I am so empty. Add something here…" />
        </Box>
      )}

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

export function AnimatedTip(props: {
  text: string;
  container?: React.MutableRefObject<null>;
  onTipShown?: () => void;
}) {
  const { text, container, onTipShown } = props;
  const [showTip, setShowTip] = useState(false);

  useEffect(
    () => {
      const timeout1 = setTimeout(() => setShowTip(true), 1000);
      const timeout2 = setTimeout(() => setShowTip(false), 5000);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);

        if (onTipShown) {
          onTipShown();
        }
      };
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Slide
      direction="up"
      in={showTip}
      timeout={500}
      container={container?.current}
      mountOnEnter
      unmountOnExit
    >
      <Box>
        <Fade in={showTip} timeout={500}>
          <Box
            sx={{
              backgroundColor: blue['100'],
              boxShadow: 2,
              fontSize: 'small',
              px: 2,
              py: 1,
              borderRadius: 2,
              color: 'text.secondary',
            }}
          >
            {text}
          </Box>
        </Fade>
      </Box>
    </Slide>
  );
}
