import { cloneDeep } from '@apollo/client/utilities';
import { useMutation } from '@apollo/client';
import {
  addProject as addProjectMutation,
  IssueAddResponse,
  ProjectAddResponse,
  ProjectRemoveResponse,
  ProjectUpdateResponse,
  removeProject as removeProjectMutation,
  updateProject as updateProjectMutation,
  addIssue as addIssueMutation,
  updateIssue as updateIssueMutation,
  removeIssue as removeIssueMutation,
  IssueUpdateResponse,
  IssueRemoveResponse,
} from './mutations';
import {
  getProjects,
  getSingleProject,
  ProjectsQueryResponse,
  SingleProjectResponse,
} from './queries';

export const useAddProjectMutation = () => {
  const [addProjectCallback, { data, loading }] =
    useMutation<ProjectAddResponse>(addProjectMutation, {
      update: (cache, result) => {
        const allProjects = cache.readQuery<ProjectsQueryResponse>({
          query: getProjects,
        });
        if (!allProjects || !result.data?.addProject) {
          return;
        }

        cache.writeQuery<ProjectsQueryResponse>({
          query: getProjects,
          data: { projects: [...allProjects.projects, result.data.addProject] },
        });
      },
    });

  return {
    callback: addProjectCallback,
    data,
    loading,
  };
};

export const useUpdateProjectMutation = () => {
  const [updateProjectCallback, { data, loading }] =
    useMutation<ProjectUpdateResponse>(updateProjectMutation);

  return {
    callback: updateProjectCallback,
    data,
    loading,
  };
};

export const useRemoveProjectMutation = () => {
  const [removeProjectCallback, { data, loading }] =
    useMutation<ProjectRemoveResponse>(removeProjectMutation, {
      update: (cache, result) => {
        const allProjects = cache.readQuery<ProjectsQueryResponse>({
          query: getProjects,
        });
        if (!allProjects || !result.data?.removeProject) {
          return;
        }

        const newProjects = allProjects.projects.filter(
          (p) => p.id !== result.data?.removeProject?.id
        );

        cache.writeQuery<ProjectsQueryResponse>({
          query: getProjects,
          data: { projects: newProjects },
        });
      },
    });

  return {
    callback: removeProjectCallback,
    data,
    loading,
  };
};

export const useAddIssueMutation = (props: { projectId: string }) => {
  const { projectId } = props;

  const [addIssueCallback, { data, loading }] = useMutation<IssueAddResponse>(
    addIssueMutation,
    {
      update: (cache, result) => {
        const projectResponse = cache.readQuery<SingleProjectResponse>({
          query: getSingleProject,
          variables: { id: projectId },
        });

        if (!projectResponse?.project || !result.data?.addIssue) {
          return;
        }

        var updatedProject = cloneDeep(projectResponse.project);
        updatedProject.issuesConnection.items.push(result.data.addIssue);

        cache.writeQuery<SingleProjectResponse>({
          query: getSingleProject,
          variables: { id: projectId },
          data: { project: updatedProject },
        });
      },
    }
  );

  return {
    callback: addIssueCallback,
    data,
    loading,
  };
};

export const useUpdateIssueMutation = () => {
  const [updateIssueCallback, { data, loading }] =
    useMutation<IssueUpdateResponse>(updateIssueMutation);

  return {
    callback: updateIssueCallback,
    data,
    loading,
  };
};

export const useRemoveIssueMutation = (props: {
  projectId: string;
  issueId: string;
}) => {
  const { projectId, issueId } = props;

  const [removeIssueCallback, { data, loading }] =
    useMutation<IssueRemoveResponse>(removeIssueMutation, {
      update: (cache, result) => {
        const projectResponse = cache.readQuery<SingleProjectResponse>({
          query: getSingleProject,
          variables: { id: projectId },
        });

        if (!projectResponse?.project || !result.data?.removeIssue) {
          return;
        }

        const indexToRemove =
          projectResponse.project.issuesConnection.items.findIndex(
            (p) => p.id === issueId
          );
        if (indexToRemove < 0) {
          return;
        }

        var updatedProject = cloneDeep(projectResponse.project);

        const issues = updatedProject.issuesConnection.items;
        issues.splice(indexToRemove, 1);

        cache.writeQuery<SingleProjectResponse>({
          query: getSingleProject,
          variables: { id: projectId },
          data: { project: updatedProject },
        });
      },
    });

  return {
    callback: removeIssueCallback,
    data,
    loading,
  };
};
