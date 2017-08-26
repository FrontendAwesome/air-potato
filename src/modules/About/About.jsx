import React from 'react';
import { connect } from 'react-redux';
import * as fromTransaction from '../../ducks/transactions';

const About = ({ createTransaction }) => (
  <div>
    <h1>About</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </p>
    <button
      onClick={() => {
        createTransaction({
          demo: 'test',
        });
      }}
    >
      Create
    </button>
  </div>
);

// export default About;
export default connect(
  null,
  {
    createTransaction: fromTransaction.createTransaction,
  },
)(About);
