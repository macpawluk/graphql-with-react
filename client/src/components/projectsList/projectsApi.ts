import { Project } from '@app/models';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { graphQlFetch, graphQlMutate, GraphQlResponse } from './../../shared';

const queryAll = `
    query projectsQuery {
      projects {
          id,
          name,
          abbreviation,
          description,
          color,
          updated,
          issuesConnection(first: 10) {
              totalCount,
          }
      }
    }
`;

interface FetchAllProjectsInput {
  projects: Project[];
}

export async function fetchAllProjects(
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<GraphQlResponse<FetchAllProjectsInput>> {
  const result = await graphQlFetch<FetchAllProjectsInput>(queryAll, dispatch);
  return result;
}

const querySingle = (id: string) => `
    query projectQuery {    
      project(id: "${id}") {
        id,
        name,
        abbreviation,
        description,
        color,
        updated,
        issuesConnection(first: 1000) {
            totalCount,
            pageInfo {
                endCursor,
                hasNextPage
            },
            items {
                id,
                name,
                description,
                type,
                status,
                updated,
                lastStatusChange
            }
        }
      }
    }
`;

interface FetchProjectDetailsInput {
  project: Project;
}

export async function fetchProjectDetails(
  id: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<GraphQlResponse<FetchProjectDetailsInput>> {
  const result = await graphQlFetch<FetchProjectDetailsInput>(
    querySingle(id),
    dispatch
  );

  return result;
}

const addProjectMutation = `
    mutation ($project:ProjectInsertInput!) {
      addProject(project: $project) {
        id,
        name,
        abbreviation,
        description,
        color,
        updated
      }
    }
`;

interface AddProjectMutationInput {
  addProject: Project;
}

export async function addProject(
  project: Project,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<GraphQlResponse<AddProjectMutationInput>> {
  const { id, name, abbreviation, description, color } = project;

  const result = await graphQlMutate<AddProjectMutationInput>(
    addProjectMutation,
    {
      project: {
        id,
        name,
        abbreviation,
        description,
        color,
      },
    },
    dispatch
  );
  return result;
}

const updateProjectMutation = `
    mutation ($project:ProjectInput!) {
      updateProject(project: $project) {
        id,
        name,
        abbreviation,
        description,
        color,
        updated
      }
    }
`;

interface UpdateProjectMutationInput {
  updateProject: Project;
}

export async function updateProject(
  project: Project,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<GraphQlResponse<UpdateProjectMutationInput>> {
  const { id, name, abbreviation, description, color } = project;

  const result = await graphQlMutate<UpdateProjectMutationInput>(
    updateProjectMutation,
    {
      project: {
        id,
        name,
        abbreviation,
        description,
        color,
      },
    },
    dispatch
  );
  return result;
}

const removeProjectMutation = `
    mutation ($project:EntityIDInput!) {
      removeProject(project: $project) {
        id,
        name
      }
    }
`;

interface RemoveProjectMutationInput {
  removeProject: Project;
}

export async function removeProject(
  id: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<GraphQlResponse<RemoveProjectMutationInput>> {
  const result = await graphQlMutate<RemoveProjectMutationInput>(
    removeProjectMutation,
    { project: { id } },
    dispatch
  );
  return result;
}
