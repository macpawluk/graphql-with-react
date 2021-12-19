import { useQuery } from '@apollo/client';
import {
  getProjects,
  getSingleProject,
  ProjectsQueryResponse,
  SingleProjectResponse,
} from './queries';

export const useProjectsQuery = () => {
  const { data, loading } = useQuery<ProjectsQueryResponse, {}>(getProjects);

  return {
    data,
    loading,
  };
};

export const useSingleProjectQuery = (projectId: string) => {
  const { data, loading } = useQuery<SingleProjectResponse>(getSingleProject, {
    variables: { id: projectId },
  });

  return {
    data,
    loading,
  };
};
