import { InMemoryCache, makeVar } from '@apollo/client';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

export const lastErrorVar = makeVar<string>('');

export const { link: networkNotifierLink, useApolloNetworkStatus } =
  createNetworkStatusNotifier();

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        lastError: {
          read() {
            return lastErrorVar();
          },
        },
        projects: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
