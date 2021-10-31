import { History } from 'history';

export const setQueryParam = <T extends { toString(): string }>(
  history: History<unknown>,
  paramName: string,
  value: T | null
) => {
  const params = new URLSearchParams();

  if (value) {
    params.append(paramName, value.toString());
    history.push({ search: params.toString() });
  } else {
    params.delete(paramName);
    history.push({ search: params.toString() });
  }
};
