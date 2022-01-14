import { gql } from '@apollo/client';
import { Project } from '@app/graphql-types';

export interface ProjectsQueryResponse {
  projects: Project[];
}

export interface SingleProjectResponse {
  project: Project;
}

export interface AppLocalState {
  lastError: string;
}

export const getAppLocalState = gql`
  query AppLocalState {
    lastError @client
  }
`;
