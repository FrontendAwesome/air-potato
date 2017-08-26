import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { login, logout } from '../../../ducks/auth';
import config from './config';
import { addOrganization } from '../../../ducks/organizations';
import { addMetric } from '../../../ducks/metrics';

firebase.initializeApp(config);
const database = firebase.database();
const organizationsRef = database.ref('Organizations');
const metricsRef = database.ref('Metrics');
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

class Init extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    firebase.auth().onAuthStateChanged((loginAsUser) => {
      if (loginAsUser) {
        dispatch(login(loginAsUser));
      } else {
        dispatch(logout());
      }
    });
    organizationsRef.on('child_added', (data) => {
      dispatch(addOrganization({
        id: data.key,
        ...(data.val()),
      }));
    });
    metricsRef.on('child_added', (data) => {
      dispatch(addMetric({
        id: data.key,
        ...(data.val()),
      }));
    });
  };
  render = () => null;
}

Init.propTypes = {
  dispatch: PropTypes.func,
};

export default withRouter(connect()(Init));
