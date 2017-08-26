import React from 'react';
import './Metric.css';

const Metric = (props) => {
  const { metric } = props;
  return (
    <article className="metric">
      <div className="metric__unit">{ metric.metric_unit } Count</div>
      <div className="metric__value">67</div>
      <div className="metric__raised">
        <span className="metric__raised--amount">$1,056</span>
        <span className="metric__raised--text"> raised!</span>
      </div>
      <div className="metric__pledged">
        <span className="metric__pledged--amount">$2,567</span>
        <span className="metric__pledged--text"> pledged!</span>
      </div>
    </article>
  );
};

export default Metric;
