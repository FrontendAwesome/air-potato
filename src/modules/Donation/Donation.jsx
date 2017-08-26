import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrganization } from '../../ducks/organizations';
import { getMetrics } from '../../ducks/metrics';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Donation.css';

export class Donation extends React.Component {
  render() {
    const { organization, metrics } = this.props;
    console.log('metrics', metrics);
    return (
      <div>
        <Header />
        <h1>{organization.name}</h1>
        <section>
          <p>Join {organization.total_transactions} other people who already pledged!</p>
          <hr />
          { metrics.map((metric, key) => (
            <div className="donation-metric">
              <span className="donation-metric__dollar">$</span><input type="text" className="donation-metric__input" />
              <div className="donation-metric__label">
                <div className="donation-metric__text">per tiki torch counted</div>
                <div className="donation-metric__suggested">$1.00 Suggested</div>
              </div>
            </div>
          ))}
        </section>
        <section className="donation__fixed">
          <div className="donation-metric">
            <span className="donation-metric__dollar">$</span><input type="text" className="donation-metric__input" />
              <div className="donation-metric__label">
                <div className="donation-metric__text">Donate Fixed Amount</div>
                <div className="donation-metric__suggested">$1.00 Suggested</div>
              </div>
            </div>
        </section>
        <button className="donation__donate-now">Donate Now!</button>
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

export default connect(
  (state, { match:{params:{organizationKey}} }) => ({
    organization: getOrganization(state, organizationKey),
    metrics: getMetrics(state),
  }),
  null,
)(Donation);
