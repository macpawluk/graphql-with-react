import { Issue } from '@app/models';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { graphQlMutate, GraphQlResponse } from './../../shared';

const addIssueMutation = `
    mutation ($issue:IssueInsertInput!, $projectId:ID!) {
      addIssue(issue: $issue, projectId: $projectId) {
        id,
        name,
        description,
        type,
        status,
        updated,
        lastStatusChange
      }
    }
`;

interface AddIssueMutationInput {
  addIssue: Issue;
}

export async function addIssue(
  issue: Issue,
  projectId: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<GraphQlResponse<AddIssueMutationInput>> {
  const { id, name, description, type, status } = issue;

  const result = await graphQlMutate<AddIssueMutationInput>(
    addIssueMutation,
    {
      issue: {
        id,
        name,
        description,
        type,
        status,
      },
      projectId,
    },
    dispatch
  );
  return result;
}

const updateIssueMutation = `
    mutation ($issue:IssueInput!) {
      updateIssue(issue: $issue) {
        id,
        name,
        description,
        type,
        status,
        updated,
        lastStatusChange
      }
    }
`;

interface UpdateIssueMutationInput {
  updateIssue: Issue;
}

export async function updateIssue(
  issue: Issue,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<GraphQlResponse<UpdateIssueMutationInput>> {
  const { id, name, description, type, status } = issue;

  const result = await graphQlMutate<UpdateIssueMutationInput>(
    updateIssueMutation,
    {
      issue: {
        id,
        name,
        description,
        type,
        status,
      },
    },
    dispatch
  );
  return result;
}

const removeIssueMutation = `
    mutation ($issue:EntityIDInput!) {
      removeIssue(issue: $issue) {
        id,
        name
      }
    }
`;

interface RemoveIssueMutationInput {
  removeIssue: Issue;
}

export async function removeIssue(
  id: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<GraphQlResponse<RemoveIssueMutationInput>> {
  const result = await graphQlMutate<RemoveIssueMutationInput>(
    removeIssueMutation,
    { issue: { id } },
    dispatch
  );
  return result;
}
