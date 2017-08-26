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
          <ul>
          { metrics.map((metric, key) => (
            <li></li>
          ))}
          </ul>
        </section>
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
