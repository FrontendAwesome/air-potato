import React from 'react';

const Organization = (props) => {
  const { organization } = props;
  return (
    <div>
      <h1>{organization.name}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </p>
    </div>
  )
};

export default Organization;
