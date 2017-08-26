import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getOrganizations } from '../../ducks/organizations';
import { getMetrics } from '../../ducks/metrics';
import { getTransactions } from '../../ducks/transactions';
import Organization from './Organization';
import Metric from '../../components/Metric';
import './LiveResults.css';

const LiveResults = ({ metrics, organizations, transactions }) => (
  <div>
    {organizations.map((organization, index) => (
      <Organization key={index} organization={ organization } />
    ))}
    <section className="metric_wrapper">
      {metrics.map((metric, index) => (
          <Metric key={ index } metric={ metric } />
      ))}
    </section>
    <footer className="live-results-footer">
      Donate and learn more at <a href="https://github.com/FrontendAwesome/air-potato">https://github.com/FrontendAwesome/air-potato</a>.
    </footer>
  </div>
);
LiveResults.propTypes = {
  metrics: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    metrics: getMetrics(state),
    organizations: getOrganizations(state),
    transactions: getTransactions(state),
  }),
  null,
)(LiveResults);
