import { Container } from '@mui/material';
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
import { clearError, selectAppErrorsState } from './appErrorsSlice';
import { ApplicationBar } from './components/appBar';
import { ErrorNotification } from './ErrorNotification';

const ProjectsList = lazy(() => import('./components/projectsList'));
const IssuesList = lazy(() => import('./components/issuesList'));

function App() {
  const dispatch = useDispatch();
  const appErrorsState = useAppSelector(selectAppErrorsState);
  const hasError = !!appErrorsState.lastError;

  const handleErrorPopupClose = () => {
    dispatch(clearError());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ApplicationBar />
      <Container fixed>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
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
        errorMessage={appErrorsState.lastError as string}
        open={hasError}
        onClose={handleErrorPopupClose}
      />
    </DndProvider>
  );
}

export default App;
