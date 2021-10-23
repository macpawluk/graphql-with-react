import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Project } from './../../models/project';
import { ProjectsConsts, selectProject } from './../projectsList';
import { getSingleProjectsAsync } from './../projectsList/projectsSlice';
import { IssueItem } from './IssueItem';

export function IssuesList() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) =>
    selectProject(state, id)
  ) as Project;

  const shouldSendRequest = project && Project.hasItems(project);

  useEffect(() => {
    if (shouldSendRequest) {
      return;
    }
    dispatch(getSingleProjectsAsync(id));
  }, [dispatch, id, shouldSendRequest]);

  return (
    <React.Fragment>
      <PageBreadcrumbs project={project} />

      <Box sx={{ mt: 2 }}>
        {Project.hasItems(project) &&
          project.issuesConnection.items.map((i) => (
            <IssueItem key={i.id} issue={i} />
          ))}
      </Box>
    </React.Fragment>
  );
}

export function PageBreadcrumbs(props: { project: Project }) {
  const { project } = props;

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 3, mb: 4 }}>
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
