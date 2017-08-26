import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import PrivateRoute from '../PrivateRoute';
import { createStore } from '../../state';
import FirebaseInit from '../Firebase/Init';
import FirebaseAuthBar from '../Firebase/AuthBar';
import LiveRestuls from '../LiveResults';
import HomePage from '../HomePage';
import Admin from '../Admin';
import NoMatch from '../NoMatch';
import ExampleRedux from '../Examples/ExampleRedux';
import ExampleDatabase from '../Examples/ExampleDatabase';
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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/liverestuls" component={LiveResults} />
              <Route exact path="/liverestuls" component={LiveResults} />
              <PrivateRoute exact path="/admin" component={Admin} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <FirebaseAuthBar />
          <hr />
          <h1>Examples</h1>
          <ExampleRedux />
          <ExampleDatabase />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
