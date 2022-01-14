import { cloneDeep } from '@apollo/client/utilities';
import {
  useAddIssueMutation as useAddIssueMutationInternal,
  useAddProjectMutation as useAddProjectMutationInternal,
  useRemoveIssueMutation as useRemoveIssueMutationInternal,
  useRemoveProjectMutation as useRemoveProjectMutationInternal,
  useUpdateIssueMutation as useUpdateIssueMutationInternal,
  useUpdateProjectMutation as useUpdateProjectMutationInternal,
} from '@app/graphql-hooks';
import {
  GetProjectDocument,
  GetProjectsDocument,
  Issue,
  Project,
} from '@app/graphql-types';
import { ProjectsQueryResponse, SingleProjectResponse } from './queries';

export const useAddProjectMutation = () => {
  const [addProjectCallback, { data, loading }] = useAddProjectMutationInternal(
    {
      update: (cache, result) => {
        const allProjects = cache.readQuery<ProjectsQueryResponse>({
          query: GetProjectsDocument,
        });
        if (!allProjects || !result.data?.addProject) {
          return;
        }

        cache.writeQuery<ProjectsQueryResponse>({
          query: GetProjectsDocument,
          data: {
            projects: [
              ...(allProjects.projects as Project[]),
              result.data.addProject as Project,
            ],
          },
        });
      },
    }
  );

  return {
    callback: addProjectCallback,
    data,
    loading,
  };
};

export const useUpdateProjectMutation = () => {
  const [updateProjectCallback, { data, loading }] =
    useUpdateProjectMutationInternal();

  return {
    callback: updateProjectCallback,
    data,
    loading,
  };
};

export const useRemoveProjectMutation = () => {
  const [removeProjectCallback, { data, loading }] =
    useRemoveProjectMutationInternal({
      update: (cache, result) => {
        const allProjects = cache.readQuery<ProjectsQueryResponse>({
          query: GetProjectsDocument,
        });
        if (!allProjects || !result.data?.removeProject) {
          return;
        }

        const newProjects = allProjects.projects.filter(
          (p) => p.id !== result.data?.removeProject?.id
        );

        cache.writeQuery<ProjectsQueryResponse>({
          query: GetProjectsDocument,
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

  const [addIssueCallback, { data, loading }] = useAddIssueMutationInternal({
    update: (cache, result) => {
      const projectResponse = cache.readQuery<SingleProjectResponse>({
        query: GetProjectDocument,
        variables: { id: projectId },
      });

      if (!projectResponse?.project || !result.data?.addIssue) {
        return;
      }

      var updatedProject = cloneDeep(projectResponse.project);
      (updatedProject.issuesConnection?.items as Issue[]).push(
        result.data.addIssue
      );

      cache.writeQuery<SingleProjectResponse>({
        query: GetProjectDocument,
        variables: { id: projectId },
        data: { project: updatedProject },
      });
    },
  });

  return {
    callback: addIssueCallback,
    data,
    loading,
  };
};

export const useUpdateIssueMutation = () => {
  const [updateIssueCallback, { data, loading }] =
    useUpdateIssueMutationInternal();

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
    useRemoveIssueMutationInternal({
      update: (cache, result) => {
        const projectResponse = cache.readQuery<SingleProjectResponse>({
          query: GetProjectDocument,
          variables: { id: projectId },
        });

        if (!projectResponse?.project || !result.data?.removeIssue) {
          return;
        }

        const indexToRemove = (
          projectResponse.project.issuesConnection?.items as Issue[]
        ).findIndex((p) => p.id === issueId);
        if (indexToRemove < 0) {
          return;
        }

        var updatedProject = cloneDeep(projectResponse.project);

        const issues = updatedProject.issuesConnection?.items as Issue[];
        issues.splice(indexToRemove, 1);

        cache.writeQuery<SingleProjectResponse>({
          query: GetProjectDocument,
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
