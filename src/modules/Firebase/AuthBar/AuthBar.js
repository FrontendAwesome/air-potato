import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseLogin from '../Login';
import FirebaseLogout from '../Logout';

class AuthBar extends React.Component {
  render = () => {
      return this.props.isAuthenticated ? (
        <FirebaseLogout />
      ) : (
        <FirebaseLogin/>
      );
  };
}

AuthBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(
  mapStateToProps,
)(AuthBar));
