import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';

const auth = firebase.auth;
const provider = new auth.GoogleAuthProvider();

export const loginClick = () => {
  auth().signInWithRedirect(provider);
};

export class Login extends React.Component {
  render = () => (<button onClick={loginClick}>Login</button>);
}

export default withRouter(connect()(Login));
