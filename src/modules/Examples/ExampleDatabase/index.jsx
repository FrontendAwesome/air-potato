import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as ExampleRedux from '../../../ducks/examples';

class ExampleDatabase extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    ExampleRedux.watchToggleCounterOn(dispatch);
  }

  componentWillUnmount() {
    ExampleRedux.watchToggleCounterOff();
  }

  render = () => (<h1>{this.props.toggleCount} Toggles</h1>);
}

ExampleDatabase.propTypes = {
  dispatch: PropTypes.func,
  toggleCount: PropTypes.number,
};

const mapStateToProps = state => ({
  toggleCount: state.examples.toggleCount,
});

export default withRouter(connect(
  mapStateToProps,
)(ExampleDatabase));
