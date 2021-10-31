import { Issue } from './../../models';
import { graphQlMutate } from './../../utils/graphQl';

const addIssueMutation = `
    mutation ($issue:IssueInsertInput!, $projectId:ID!) {
      addIssue(issue: $issue, projectId: $projectId) {
        id,
        name,
        description,
        type,
        status
      }
    }
`;

export async function addIssue(
  issue: Issue,
  projectId: string
): Promise<Issue> {
  const { id, name, description, type, status } = issue;

  const result = await graphQlMutate<{ addIssue: Issue }>(addIssueMutation, {
    issue: {
      id,
      name,
      description,
      type,
      status,
    },
    projectId,
  });
  return result.addIssue;
}

const editIssueMutation = `
    mutation ($issue:IssueInput!) {
      editIssue(issue: $issue) {
        id,
        name,
        description,
        type,
        status
      }
    }
`;

export async function editIssue(issue: Issue): Promise<Issue> {
  const { id, name, description, type, status } = issue;

  const result = await graphQlMutate<{ editIssue: Issue }>(editIssueMutation, {
    issue: {
      id,
      name,
      description,
      type,
      status,
    },
  });
  return result.editIssue;
}

const removeIssueMutation = `
    mutation ($issue:EntityIDInput!) {
      removeIssue(issue: $issue) {
        id,
        name
      }
    }
`;

export async function removeIssue(id: string): Promise<Issue> {
  const result = await graphQlMutate<{ removeIssue: Issue }>(
    removeIssueMutation,
    { issue: { id } }
  );
  return result.removeIssue;
}
