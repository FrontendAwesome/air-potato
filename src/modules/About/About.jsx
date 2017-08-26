import React from 'react';
import { connect } from 'react-redux';
import * as fromTransaction from '../../ducks/transactions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const About = ({ createTransaction }) => (
  <div>
    <Header />

    <button
      onClick={() => {
        createTransaction({
          demo: 'test',
        });
      }}
    >
      Create
    </button>
    <Footer />
  </div>
);

// export default About;
export default connect(
  null,
  {
    createTransaction: fromTransaction.createTransaction,
  },
)(About);
