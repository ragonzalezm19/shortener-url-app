import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CreateShortUrl from './pages/CreateShortUrl';
import RedirectUrl from './pages/RedirectUrl';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/create'>
          <CreateShortUrl />
        </Route>
        <Route path='/sh/:alias'>
          <RedirectUrl />
        </Route>
        <Route path='/'>
          <Redirect to='/create' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
