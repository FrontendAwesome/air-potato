import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Organization.css';

export class Organization extends React.Component {
  donate = () => {
    const { history, organization } = this.props;
    history.push(`/donation/${organization.id}`);
  };

  render() {
    const {organization} = this.props;
    return (
      <article className="organization">
        <h2 className="organization__title">{organization.name}</h2>
        <div className="organization__below">
          <div className="organization__raised">
            <span className="organization__raised--amount">${organization.money_earned.donations.toFixed(2)}</span>
            <span className="organization__raised--text"> Raised</span>
          </div>
          <div className="organization__pledged">
            <span className="organization__pledged--amount">${organization.money_earned.pledges.toFixed(2)}</span>
            <span className="organization__pledged--text"> Pledged by </span>
            <span className="organization__pledged--count">{organization.total_transactions}</span>
            <span className="organization__pledged--unit"> People</span>
          </div>
        </div>
        <button type="button" onClick={this.donate}>Pledge or Donate Now</button>
      </article>
    )
  }
}

Organization.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect()(Organization));