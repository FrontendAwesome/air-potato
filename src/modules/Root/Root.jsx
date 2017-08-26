import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import PrivateRoute from '../../components/PrivateRoute';
import { createStore } from '../../state';
import FirebaseInit from '../Firebase/Init';
import FirebaseAuthBar from '../Firebase/AuthBar';
import LiveResults from '../LiveResults';
import HomePage from '../HomePage';
import Contact from '../Contact';
import About from '../About';
import Donation from '../Donation';
import DonationThankYou from '../Donation/ThankYou';
import Admin from '../Admin';
import MetricIncrement from '../Admin/MetricIncrement';
import NoMatch from '../../components/NoMatch';
import './Root.css';

injectTapEventPlugin();
const store = createStore();

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container" id="root">
          <FirebaseInit />
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/about" component={About} />
              <Route exact path="/donation" component={Donation} />
              <Route exact path="/donation/thank-you" component={DonationThankYou} />
              <Route exact path="/live-results" component={LiveResults} />
              <PrivateRoute exact path="/admin" component={Admin} />
              <PrivateRoute exact path="/admin/metric-increment" component={MetricIncrement} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <FirebaseAuthBar />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
