import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { login, logout } from '../../../ducks/auth';
import config from './config';

firebase.initializeApp(config);
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
  };

  render = () => null;
}

Init.propTypes = {
  dispatch: PropTypes.func,
};

export default withRouter(connect()(Init));