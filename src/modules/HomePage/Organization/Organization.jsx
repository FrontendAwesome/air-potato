import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash'
import './Organization.css';

export class Organization extends React.Component {
  donate = () => {
    const { history, organization } = this.props;
    history.push(`/donation/${organization.id}`);
  };

  render() {
    const { organization, metrics } = this.props;

    //  Compute total money for this Org
    let donated_money = organization.money_earned.donations
    let pledged_money = 0
    let org_metrics = _.filter(metrics, m => m.org_totals[organization.id])
    for( let metric of org_metrics ) {
      pledged_money += metric.org_totals[organization.id].rate * metric.total_metric_value
    }
    let total_money = donated_money + pledged_money
    
    return (
      <article className="organization">
        <h2 className="organization__title">{organization.name}</h2>
        <div className="organization__below">
          <div className="organization__raised">
            <span className="organization__raised--amount">${total_money.toFixed(2)}</span>
            <span className="organization__raised--text"> Raised by </span>
            <span className="organization__pledged--count">{organization.total_transactions}</span>
            <span className="organization__pledged--unit"> People</span>
          </div>
        </div>
        <div className="organization__below">
          <div className="organization__pledged">
            <span className="organization__pledged--amount">${pledged_money.toFixed(2)}</span>
            <span className="organization__pledged--text"> Pledged / </span>
            <span className="organization__pledged--amount">${donated_money.toFixed(2)}</span>
            <span className="organization__pledged--text"> Donated</span>
          </div>
        </div>
        <button type="button" className="organization__donate" onClick={this.donate}>Pledge or Donate Now</button>
      </article>
    );
  }
}

Organization.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect()(Organization));
