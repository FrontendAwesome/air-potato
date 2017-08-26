import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { logout } from '../../../ducks/auth';

const auth = firebase.auth;

export class Logout extends React.Component {
  logoutClick = async () => {
    const { dispatch } = this.props;
    await auth().signOut();
    dispatch(logout());
  };

  render = () => (<button className="firebase__button firebase__button--logout" onClick={this.logoutClick}>Logout</button>);
}

export default withRouter(connect()(Logout));
