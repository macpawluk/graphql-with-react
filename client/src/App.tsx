import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  gql,
  NormalizedCacheObject,
  useQuery,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { AppLocalState, getAppLocalState } from '@app/api';
import { cache, lastErrorVar, networkNotifierLink } from '@app/cache';
import { Box, CircularProgress, Container } from '@mui/material';
import { lazy, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { ApplicationBar } from './components/appBar';
import { ErrorNotification } from './ErrorNotification';

const ProjectsList = lazy(() => import('./components/projectsList'));
const IssuesList = lazy(() => import('./components/issuesList'));

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_ADDRESS as string,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.warn('GLOBAL ERROR HANDLER', graphQLErrors, networkError);

  const errorMessage = !!graphQLErrors
    ? 'An API error occurred. Try again.'
    : 'A network error occurred. Try again.';
  lastErrorVar(errorMessage);
});

const localStateTypeDefs = gql`
  extend type Query {
    lastError: String
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, networkNotifierLink.concat(httpLink)]),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
  },
  typeDefs: localStateTypeDefs,
});

function App() {
  const handleErrorPopupClose = () => {
    lastErrorVar('');
  };

  return (
    <ApolloProvider client={client}>
      <DndProvider backend={HTML5Backend}>
        <ApplicationBar />
        <Container fixed>
          <Router>
            <Suspense fallback={<ModuleLoader />}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/projects" />
                </Route>
                <Route path="/projects/" component={ProjectsList} />
                <Route path="/project/:id/issues" component={IssuesList} />
              </Switch>
            </Suspense>
          </Router>
        </Container>

        <ErrorProvider onClose={handleErrorPopupClose} />
      </DndProvider>
    </ApolloProvider>
  );
}

const ModuleLoader = () => {
  return (
    <Box
      sx={{
        height: 600,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <CircularProgress
          color="secondary"
          style={{ width: '30px', height: '30px' }}
          sx={{
            mr: 2,
          }}
        />
        <div>Loading...</div>
      </Box>
    </Box>
  );
};

export default App;

export function ErrorProvider(props: { onClose?: () => void }) {
  const { data } = useQuery<AppLocalState>(getAppLocalState);
  const hasError = !!data?.lastError;

  return (
    <ErrorNotification
      errorMessage={data?.lastError ?? ''}
      open={hasError}
      onClose={props.onClose}
    />
  );
}
