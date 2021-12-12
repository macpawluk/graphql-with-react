import { Box, CircularProgress, Container } from '@mui/material';
import { lazy, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { useAppSelector } from './app/hooks';
import { clearError, selectAppState } from './appStateSlice';
import { ApplicationBar } from './components/appBar';
import { ErrorNotification } from './ErrorNotification';

const ProjectsList = lazy(() => import('./components/projectsList'));
const IssuesList = lazy(() => import('./components/issuesList'));

function App() {
  const dispatch = useDispatch();
  const appState = useAppSelector(selectAppState);
  const hasError = !!appState.lastError;

  const handleErrorPopupClose = () => {
    dispatch(clearError());
  };

  return (
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

      <ErrorNotification
        errorMessage={appState.lastError as string}
        open={hasError}
        onClose={handleErrorPopupClose}
      />
    </DndProvider>
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
