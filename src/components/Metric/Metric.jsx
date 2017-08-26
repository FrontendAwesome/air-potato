import React from 'react';

const Metric = (props) => {
  const { metric } = props;
  console.log('met', metric);
  return (
    <div>
      <h1>{ metric.metric_unit }</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </p>
    </div>
  );
};

export default Metric;
