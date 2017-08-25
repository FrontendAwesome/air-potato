import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import PrivateRoute from '../../components/PrivateRoute';
import { createStore } from '../../state';
import FirebaseInit from '../Firebase/Init';
import FirebaseAuthBar from '../Firebase/AuthBar';
import Dashboard from '../Dashboard';
import Admin from '../Admin';
import NoMatch from '../../components/NoMatch';
import logo from './logo.svg';
import './Root.css';

injectTapEventPlugin();
const store = createStore();

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div id="root">
          <FirebaseInit />
          <div className="app-header">
            <img src={logo} className="app-logo" alt="logo" style={{maxWidth: '200px'}} />
            <h2>Welcome to React</h2>
          </div>
          <div>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/admin" component={Admin} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <FirebaseAuthBar />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
