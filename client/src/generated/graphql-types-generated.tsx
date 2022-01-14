import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
};

export type EntityIdInput = {
  /** The id of the entity. */
  id: Scalars['String'];
};

export type Issue = {
  __typename?: 'Issue';
  /** The description of the issue. */
  description: Scalars['String'];
  /** The id of the issue. */
  id: Scalars['String'];
  /** The timestamp of the last status change. */
  lastStatusChange: Scalars['DateTime'];
  /** The name of the issue. */
  name: Scalars['String'];
  /** The status of the issue. */
  status?: Maybe<IssueStatus>;
  /** The type of the issue. */
  type?: Maybe<IssueType>;
  /** The timestamp of the last data update. */
  updated: Scalars['DateTime'];
};

/** A connection from an object to a list of objects of type `Issue`. */
export type IssueConnection = {
  __typename?: 'IssueConnection';
  /** A list of all of the edges returned in the connection. */
  edges?: Maybe<Array<Maybe<IssueEdge>>>;
  /** A list of all of the objects returned in the connection. This is a convenience field provided for quickly exploring the API; rather than querying for "{ edges { node } }" when no edge data is needed, this field can be used instead. Note that when clients like Relay need to fetch the "cursor" field on the edge to enable efficient pagination, this shortcut cannot be used, and the full "{ edges { node } } " version should be used instead. */
  items?: Maybe<Array<Maybe<Issue>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing "5" as the argument to `first`, then fetch the total count so it could display "5 of 83", for example. In cases where we employ infinite scrolling or don't have an exact count of entries, this field will return `null`. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection from an object to another object of type `Issue`. */
export type IssueEdge = {
  __typename?: 'IssueEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Issue>;
};

export type IssueInput = {
  /** The description of the issue. */
  description: Scalars['String'];
  /** The id of the issue. */
  id: Scalars['String'];
  /** The name of the issue. */
  name: Scalars['String'];
  /** The status of the issue. */
  status?: InputMaybe<IssueStatus>;
  /** The type of the issue. */
  type?: InputMaybe<IssueType>;
};

export type IssueInsertInput = {
  /** The description of the issue. */
  description: Scalars['String'];
  /** The id of the issue. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the issue. */
  name: Scalars['String'];
  /** The status of the issue. */
  status?: InputMaybe<IssueStatus>;
  /** The type of the issue. */
  type?: InputMaybe<IssueType>;
};

/** Status of an issue */
export enum IssueStatus {
  /** The issue is completed */
  Completed = 'COMPLETED',
  /** The issue is in progress */
  InProgress = 'IN_PROGRESS',
  /** The issue is not started */
  NotStarted = 'NOT_STARTED',
  /** The issue is paused */
  Paused = 'PAUSED',
  /** Unknown */
  Unknown = 'UNKNOWN'
}

/** Type of an issue */
export enum IssueType {
  /** A bug */
  Bug = 'BUG',
  /** An improvement */
  Improvement = 'IMPROVEMENT',
  /** A story */
  Story = 'STORY',
  /** A task */
  Task = 'TASK',
  /** Unknown */
  Unknown = 'UNKNOWN'
}

export type Mutation = {
  __typename?: 'Mutation';
  addIssue?: Maybe<Issue>;
  addProject?: Maybe<Project>;
  removeIssue?: Maybe<Issue>;
  removeProject?: Maybe<Project>;
  updateIssue?: Maybe<Issue>;
  updateProject?: Maybe<Project>;
};


export type MutationAddIssueArgs = {
  issue: IssueInsertInput;
  projectId?: InputMaybe<Scalars['ID']>;
};


export type MutationAddProjectArgs = {
  project: ProjectInsertInput;
};


export type MutationRemoveIssueArgs = {
  issue: EntityIdInput;
};


export type MutationRemoveProjectArgs = {
  project: EntityIdInput;
};


export type MutationUpdateIssueArgs = {
  issue: IssueInput;
};


export type MutationUpdateProjectArgs = {
  project: ProjectInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  /** The abbreviation of the project. */
  abbreviation: Scalars['String'];
  /** The color of the project. */
  color: Scalars['String'];
  /** The description of the project. */
  description: Scalars['String'];
  /** The id of the project. */
  id: Scalars['String'];
  /** A list of a project's issues. */
  issuesConnection?: Maybe<IssueConnection>;
  /** The name of the project. */
  name: Scalars['String'];
  /** The timestamp of the last data update. */
  updated: Scalars['DateTime'];
};


export type ProjectIssuesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProjectInput = {
  /** The abbreviation of the project. */
  abbreviation: Scalars['String'];
  /** The color of the project. */
  color: Scalars['String'];
  /** The description of the project. */
  description: Scalars['String'];
  /** The id of the project. */
  id: Scalars['String'];
  /** The name of the project. */
  name: Scalars['String'];
};

export type ProjectInsertInput = {
  /** The abbreviation of the project. */
  abbreviation: Scalars['String'];
  /** The color of the project. */
  color: Scalars['String'];
  /** The description of the project. */
  description: Scalars['String'];
  /** The id of the project. */
  id?: InputMaybe<Scalars['String']>;
  /** The name of the project. */
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};

export type AddIssueMutationVariables = Exact<{
  issue: IssueInsertInput;
  projectId: Scalars['ID'];
}>;


export type AddIssueMutation = { __typename?: 'Mutation', addIssue?: { __typename?: 'Issue', id: string, name: string, description: string, type?: IssueType | null | undefined, status?: IssueStatus | null | undefined, updated: any, lastStatusChange: any } | null | undefined };

export type AddProjectMutationVariables = Exact<{
  project: ProjectInsertInput;
}>;


export type AddProjectMutation = { __typename?: 'Mutation', addProject?: { __typename?: 'Project', id: string, name: string, abbreviation: string, description: string, color: string, updated: any, issuesConnection?: { __typename?: 'IssueConnection', totalCount?: number | null | undefined } | null | undefined } | null | undefined };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: string, name: string, abbreviation: string, description: string, color: string, updated: any, issuesConnection?: { __typename?: 'IssueConnection', totalCount?: number | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, abbreviation: string, description: string, color: string, updated: any, issuesConnection?: { __typename?: 'IssueConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean }, items?: Array<{ __typename?: 'Issue', id: string, name: string, description: string, type?: IssueType | null | undefined, status?: IssueStatus | null | undefined, updated: any, lastStatusChange: any } | null | undefined> | null | undefined } | null | undefined } | null | undefined };

export type RemoveIssueMutationVariables = Exact<{
  issue: EntityIdInput;
}>;


export type RemoveIssueMutation = { __typename?: 'Mutation', removeIssue?: { __typename?: 'Issue', id: string, name: string } | null | undefined };

export type RemoveProjectMutationVariables = Exact<{
  project: EntityIdInput;
}>;


export type RemoveProjectMutation = { __typename?: 'Mutation', removeProject?: { __typename?: 'Project', id: string, name: string } | null | undefined };

export type UpdateIssueMutationVariables = Exact<{
  issue: IssueInput;
}>;


export type UpdateIssueMutation = { __typename?: 'Mutation', updateIssue?: { __typename?: 'Issue', id: string, name: string, description: string, type?: IssueType | null | undefined, status?: IssueStatus | null | undefined, updated: any, lastStatusChange: any } | null | undefined };

export type UpdateProjectMutationVariables = Exact<{
  project: ProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string, name: string, abbreviation: string, description: string, color: string, updated: any } | null | undefined };


export const AddIssueDocument = gql`
    mutation addIssue($issue: IssueInsertInput!, $projectId: ID!) {
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
export type AddIssueMutationFn = Apollo.MutationFunction<AddIssueMutation, AddIssueMutationVariables>;

/**
 * __useAddIssueMutation__
 *
 * To run a mutation, you first call `useAddIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addIssueMutation, { data, loading, error }] = useAddIssueMutation({
 *   variables: {
 *      issue: // value for 'issue'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useAddIssueMutation(baseOptions?: Apollo.MutationHookOptions<AddIssueMutation, AddIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddIssueMutation, AddIssueMutationVariables>(AddIssueDocument, options);
      }
export type AddIssueMutationHookResult = ReturnType<typeof useAddIssueMutation>;
export type AddIssueMutationResult = Apollo.MutationResult<AddIssueMutation>;
export type AddIssueMutationOptions = Apollo.BaseMutationOptions<AddIssueMutation, AddIssueMutationVariables>;
export const AddProjectDocument = gql`
    mutation addProject($project: ProjectInsertInput!) {
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
export type AddProjectMutationFn = Apollo.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, options);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const GetProjectsDocument = gql`
    query getProjects {
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

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectDocument = gql`
    query getProject($id: String!) {
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

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const RemoveIssueDocument = gql`
    mutation removeIssue($issue: EntityIDInput!) {
  removeIssue(issue: $issue) {
    id
    name
  }
}
    `;
export type RemoveIssueMutationFn = Apollo.MutationFunction<RemoveIssueMutation, RemoveIssueMutationVariables>;

/**
 * __useRemoveIssueMutation__
 *
 * To run a mutation, you first call `useRemoveIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeIssueMutation, { data, loading, error }] = useRemoveIssueMutation({
 *   variables: {
 *      issue: // value for 'issue'
 *   },
 * });
 */
export function useRemoveIssueMutation(baseOptions?: Apollo.MutationHookOptions<RemoveIssueMutation, RemoveIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveIssueMutation, RemoveIssueMutationVariables>(RemoveIssueDocument, options);
      }
export type RemoveIssueMutationHookResult = ReturnType<typeof useRemoveIssueMutation>;
export type RemoveIssueMutationResult = Apollo.MutationResult<RemoveIssueMutation>;
export type RemoveIssueMutationOptions = Apollo.BaseMutationOptions<RemoveIssueMutation, RemoveIssueMutationVariables>;
export const RemoveProjectDocument = gql`
    mutation removeProject($project: EntityIDInput!) {
  removeProject(project: $project) {
    id
    name
  }
}
    `;
export type RemoveProjectMutationFn = Apollo.MutationFunction<RemoveProjectMutation, RemoveProjectMutationVariables>;

/**
 * __useRemoveProjectMutation__
 *
 * To run a mutation, you first call `useRemoveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectMutation, { data, loading, error }] = useRemoveProjectMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useRemoveProjectMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectMutation, RemoveProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectMutation, RemoveProjectMutationVariables>(RemoveProjectDocument, options);
      }
export type RemoveProjectMutationHookResult = ReturnType<typeof useRemoveProjectMutation>;
export type RemoveProjectMutationResult = Apollo.MutationResult<RemoveProjectMutation>;
export type RemoveProjectMutationOptions = Apollo.BaseMutationOptions<RemoveProjectMutation, RemoveProjectMutationVariables>;
export const UpdateIssueDocument = gql`
    mutation updateIssue($issue: IssueInput!) {
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
export type UpdateIssueMutationFn = Apollo.MutationFunction<UpdateIssueMutation, UpdateIssueMutationVariables>;

/**
 * __useUpdateIssueMutation__
 *
 * To run a mutation, you first call `useUpdateIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIssueMutation, { data, loading, error }] = useUpdateIssueMutation({
 *   variables: {
 *      issue: // value for 'issue'
 *   },
 * });
 */
export function useUpdateIssueMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIssueMutation, UpdateIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIssueMutation, UpdateIssueMutationVariables>(UpdateIssueDocument, options);
      }
export type UpdateIssueMutationHookResult = ReturnType<typeof useUpdateIssueMutation>;
export type UpdateIssueMutationResult = Apollo.MutationResult<UpdateIssueMutation>;
export type UpdateIssueMutationOptions = Apollo.BaseMutationOptions<UpdateIssueMutation, UpdateIssueMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($project: ProjectInput!) {
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
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;