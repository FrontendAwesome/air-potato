import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getOrganizations } from '../../ducks/organizations';
import { getMetrics } from '../../ducks/metrics';
import { getTransactions } from '../../ducks/transactions';
import Organization from './Organization';
import Metric from '../../components/Metric';

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
    <h1>Dashboard</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </p>
    <div>Organizations</div>
    <ul>
      {organizations.map(o => <div key={o.id}>{o.name}</div>)}
    </ul>
    <div>Metrics</div>
    <ul>
      {metrics.map(o => <div key={o.id}>{o.id}</div>)}
    </ul>
    <div>Transactions</div>
    <ul>
      {transactions.map(o => <div key={o.id}>{o.id}</div>)}
    </ul>
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
