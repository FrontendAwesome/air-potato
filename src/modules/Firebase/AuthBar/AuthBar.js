import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseLogin from '../Login';
import FirebaseLogout from '../Logout';

class AuthBar extends React.Component {
  render = () => (
    <div>
      {this.props.isAuthenticated ? (
        <span>
          <FirebaseLogout/>
          <NavLink to="/admin" style={{marginLeft: "10px"}}>Admin</NavLink>
        </span>
      ) : (
        <FirebaseLogin/>
      )}
      <NavLink to="/dashboard" style={{marginLeft: "10px"}}>Dashboard</NavLink>
    </div>
  );
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
