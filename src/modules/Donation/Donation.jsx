import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrganization } from '../../ducks/organizations';
import { getMetrics } from '../../ducks/metrics';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
            <div>
              $<input type="text" className="metric-item__input" />
              <div className="metric-item__label">
                <div className="metric-item__text">per tiki torch counted</div>
                <div className="metric-item__suggested">$1.00 Suggested</div>
              </div>
            </div>
          ))}
        </section>
        <section className="donate__fixed">
          $<input type="text" className="metric-item__input" />
            <div className="metric-item__label">
              <div className="metric-item__text">Donate Fixed Amount</div>
              <div className="metric-item__suggested">$1.00 Suggested</div>
            </div>
        </section>
        <button className="donate__donate-now">Donate Now!</button>
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
