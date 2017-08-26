import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOrganization } from '../../ducks/organizations';
import { getMetrics } from '../../ducks/metrics';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Donation.css';


export class Donation extends React.Component {
  submitForm = () => {
    const { history } = this.props;
    const transaction = {};
    transaction.test = document.getElementById('fixed-donation');
    console.log('trans', transaction);
    history.push(`/`);
  };

  render() {
    const { organization, metrics } = this.props;
    return (
      <div>
        <Header />
        <h1>{organization.name}</h1>
        <section>
          <p>Join {organization.total_transactions} other people who already pledged!</p>
          <hr />
          { metrics.map((metric, key) => (
            <div className="donation-metric" key={key}>
              <span className="donation-metric__dollar">$</span><input value="0.00" type="text" className="donation-metric__input" name={key} id={key} />
              <div className="donation-metric__label">
                <div className="donation-metric__text">per {metric.metric_unit}</div>
                <div className="donation-metric__suggested">${metric.suggested_rate.toFixed(2)} Suggested</div>
              </div>
            </div>
          ))}
        </section>
        <section className="donation__fixed">
          <div className="donation-metric">
            <span className="donation-metric__dollar">$</span><input value="0.00" type="text" className="donation-metric__input" name="fixed-donation" id="fixed-donation" />
              <div className="donation-metric__label">
                <div className="donation-metric__text">Donate Fixed Amount</div>
              </div>
            </div>
        </section>
        <button className="donate__donate-now" onClick={this.submitForm}>Donate Now!</button>
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
  null,
)(Donation));
