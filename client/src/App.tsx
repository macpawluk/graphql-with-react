import { Container } from '@mui/material';
import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { ApplicationBar } from './components/appBar';

const ProjectsList = lazy(() => import('./components/projectsList'));
const IssuesList = lazy(() => import('./components/issuesList'));

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
