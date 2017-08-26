import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOrganization } from '../../ducks/organizations';
import { getMetrics } from '../../ducks/metrics';
import * as fromTransaction from '../../ducks/transactions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Donation.css';


export class Donation extends React.Component {
  submitForm = () => {
    const { history, metrics, organization, createTransaction } = this.props;
    const transaction = {};
    transaction.org_key = organization.id;
    transaction.user = {name: "Foo Bar"};
    transaction.pledges = {};
    metrics.map((metric) => {
      transaction.pledges[metric.id] = parseFloat(document.getElementById(metric.id).value) || 0;
    });
    transaction.donation = parseFloat(document.getElementById('fixed-donation').value) || 0;
    console.log('trans', transaction);
    createTransaction(transaction);
    history.push(`/`);
  };

  render() {
    const { organization, metrics } = this.props;
    return (
      <div>
        <Header />
        <h1>{organization.name}</h1>
        <section className="donation-metric__wrapper">
          <p>Join {organization.total_transactions} other people who already pledged!</p>
          <hr />
          { metrics.map((metric, key) => (
            <div className="donation-metric" key={key}>
              <span className="donation-metric__dollar">$</span><input type="text" className="donation-metric__input" name={metric.id} id={metric.id} />
              <div className="donation-metric__label">
                <div className="donation-metric__text">per {metric.metric_unit}</div>
                <div className="donation-metric__suggested">${metric.suggested_rate.toFixed(2)} Suggested</div>
              </div>
            </div>
          ))}
        </section>
        <p className="donation-metric__or">Or</p>
        <section className="donation-metric__wrapper donation-metric__wrapper--fixed">
          <div className="donation-metric">
            <span className="donation-metric__dollar">$</span><input type="text" className="donation-metric__input" name="fixed-donation" id="fixed-donation" />
              <div className="donation-metric__label">
                <div className="donation-metric__text">Donate Fixed Amount</div>
              </div>
            </div>
        </section>
        <button className="donation__donate-now" onClick={this.submitForm} >Donate Now!</button>
        <Footer />
      </div>
    )
  }
};

Donation.propTypes = {
  organization: PropTypes.shape({}).isRequired,
  metrics: PropTypes.array.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(
  (state, { match:{params:{organizationKey}} }) => ({
    organization: getOrganization(state, organizationKey),
    metrics: getMetrics(state),
  }),
  {
    createTransaction: fromTransaction.createTransaction,
  },
)(Donation));
