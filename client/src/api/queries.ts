import { gql } from '@apollo/client';
import { Project } from '@app/models';

export interface ProjectsQueryResponse {
  projects: Project[];
}

export interface SingleProjectResponse {
  project: Project;
}

export interface AppLocalState {
  lastError: string;
}

export const getProjects = gql`
  query projectsQuery {
    projects {
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

export const getSingleProject = gql`
  query projectQuery($id: String!) {
    project(id: $id) {
      id
      name
      abbreviation
      description
      color
      updated
      issuesConnection(first: 1000) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        items {
          id
          name
          description
          type
          status
          updated
          lastStatusChange
        }
      }
    }
  }
`;

export const getAppLocalState = gql`
  query AppLocalState {
    lastError @client
  }
`;
