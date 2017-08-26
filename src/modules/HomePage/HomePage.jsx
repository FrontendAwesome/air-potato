import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Organization from './Organization';
import Metric from '../../components/Metric';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrganizations } from '../../ducks/organizations';
import { getMetrics } from '../../ducks/metrics';

const HomePage = (props) => {
    const { organizations, metrics } = props;
    return (<div>
        <Header />
        <h1>Home Page</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </p>
            {organizations.map((organization, index) => (
                <Organization key={index} organization={ organization } />
            ))}
        <section className="metric_wrapper">
          {metrics.map((metric, index) => (
              <Metric key={ index } metric={ metric } />
          ))}
        </section>
        <Footer />
    </div>)
};

HomePage.propTypes = {
    metrics: PropTypes.array.isRequired,
    organizations: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    organizations: getOrganizations(state),
    metrics: getMetrics(state),
  }),
  null,
)(HomePage);
