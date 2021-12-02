import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { reportError } from './../appStateSlice';

const apiEndpointAddress = process.env.REACT_APP_API_ADDRESS as string;

export interface GraphQlResponse<T> {
  data: T;
  errors: { message: string }[];
}

export module GraphQlResponse {
  export function hasErrors<T>(response: GraphQlResponse<T>) {
    return response.errors && response.errors.length > 0;
  }
}

export const graphQlFetch = async <T extends unknown>(
  query: string,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query }),
    };

    const response = await fetch(apiEndpointAddress, requestOptions);
    const result = (await response.json()) as GraphQlResponse<T>;

    if (GraphQlResponse.hasErrors(result)) {
      dispatch(reportError({ errors: result.errors, operation: 'query' }));
    }

    return result;
  } catch (error: any) {
    dispatch(reportError({ errors: error.message, operation: 'query' }));
    throw error;
  }
};

export const graphQlMutate = async <T extends unknown>(
  mutation: string,
  variables: any,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    };

    const response = await fetch(apiEndpointAddress, requestOptions);
    const result = (await response.json()) as GraphQlResponse<T>;

    if (GraphQlResponse.hasErrors(result)) {
      dispatch(reportError({ errors: result.errors, operation: 'mutation' }));
    }

    return result;
  } catch (error: any) {
    dispatch(reportError({ errors: error.message, operation: 'mutation' }));
    throw error;
  }
};
