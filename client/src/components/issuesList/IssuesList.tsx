import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { selectProject } from './../projectsList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleProjectsAsync } from './../projectsList/projectsSlice';
import { Project } from './../../models/project';

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
        <ul>
          {Project.hasItems(project) &&
            project.issuesConnection.items.map((i) => (
              <li key={i.id}>{i.name}</li>
            ))}
        </ul>
      </Box>
    </React.Fragment>
  );
}

export function PageBreadcrumbs(props: { project: Project }) {
  const { project } = props;

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 4 }}>
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        Demo App
      </Link>
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        {project?.name}
      </Link>
      <Typography color="text.primary">Issues</Typography>
    </Breadcrumbs>
  );
}
