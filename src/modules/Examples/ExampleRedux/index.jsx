import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggle, incrementToggleCounter } from '../../../ducks/examples';

class ExampleRedux extends React.Component {
  toggleClick = () => {
    const { dispatch } = this.props;
    dispatch(toggle());
    incrementToggleCounter(dispatch);
  };

  render = () => (<button onClick={this.toggleClick}>{this.props.toggle ? 'Toggle is: ON' : 'Toggle is: OFF'}</button>);
}

ExampleRedux.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  toggle: state.examples.toggle,
});

export default withRouter(connect(
  mapStateToProps,
)(ExampleRedux));
