import React from 'react';
import './Metric.css';

const Metric = (props) => {
  const { metric } = props;
  let rate_total = 0;
  let total_raised = 0;
  if( metric.org_totals ) {
    for( let [org_key, org] of Object.entries(metric.org_totals) ) {
      rate_total += org.rate;
    }
    total_raised = rate_total * metric.total_metric_value;
  }
  return (
    <article className="metric">
      <div className="metric__unit">{ metric.metric_unit } Count: </div>
      <div className="metric__value">{ metric.total_metric_value }</div>
      <div className="metric__raised">
        <span className="metric__raised--amount">${total_raised.toFixed(2)}</span>
        <span className="metric__raised--text"> raised!</span>
      </div>
    </article>
  );
};

export default Metric;
