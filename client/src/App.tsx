import { Container } from '@mui/material';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ApplicationBar } from './components/appBar';

const ProjectsList = lazy(() => import('./components/projectsList'));
const IssuesList = lazy(() => import('./components/issuesList'));

// vvv
// That's the library I use
// https://mui.com/getting-started/usage/
// https://mui.com/system/spacing/

function App() {
  return (
    <div>
      <ApplicationBar />
      <Container fixed>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={ProjectsList} />
              <Route path="/project/:id" component={IssuesList} />
            </Switch>
          </Suspense>
        </Router>
      </Container>
    </div>
  );
}

export default App;
