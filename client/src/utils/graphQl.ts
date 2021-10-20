//vvv this should be parameterized
const apiEndpointAddress = 'http://localhost:5001/graphql';

export const graphQlFetch = async <T extends unknown>(query: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query }),
  };

  const response = await fetch(apiEndpointAddress, requestOptions);
  const result = (await response.json()) as { data: T };

  return result.data;
};

export const graphQlMutate = async <T extends unknown>(
  mutation: string,
  variables: any
) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: mutation,
      variables,
    }),
  };

  const response = await fetch(apiEndpointAddress, requestOptions);
  const result = (await response.json()) as {
    data: T;
  };

  return result.data;
};
