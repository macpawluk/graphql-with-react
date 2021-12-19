import { gql } from '@apollo/client';
import { Issue, Project } from '@app/models';

export interface ProjectAddResponse {
  addProject: Project;
}

export interface ProjectUpdateResponse {
  updateProject: Project;
}

export interface ProjectRemoveResponse {
  removeProject: { id: string; name: string };
}

export interface IssueAddResponse {
  addIssue: Issue;
}

export interface IssueUpdateResponse {
  updateIssue: Issue;
}

export interface IssueRemoveResponse {
  removeIssue: { id: string; name: string };
}

export const addProject = gql`
  mutation ($project: ProjectInsertInput!) {
    addProject(project: $project) {
      id
      name
      abbreviation
      description
      color
      updated
      issuesConnection(first: 100) {
        totalCount
      }
    }
  }
`;

export const updateProject = gql`
  mutation ($project: ProjectInput!) {
    updateProject(project: $project) {
      id
      name
      abbreviation
      description
      color
      updated
    }
  }
`;

export const removeProject = gql`
  mutation ($project: EntityIDInput!) {
    removeProject(project: $project) {
      id
      name
    }
  }
`;

export const addIssue = gql`
  mutation ($issue: IssueInsertInput!, $projectId: ID!) {
    addIssue(issue: $issue, projectId: $projectId) {
      id
      name
      description
      type
      status
      updated
      lastStatusChange
    }
  }
`;

export const updateIssue = gql`
  mutation ($issue: IssueInput!) {
    updateIssue(issue: $issue) {
      id
      name
      description
      type
      status
      updated
      lastStatusChange
    }
  }
`;

export const removeIssue = gql`
  mutation ($issue: EntityIDInput!) {
    removeIssue(issue: $issue) {
      id
      name
    }
  }
`;
