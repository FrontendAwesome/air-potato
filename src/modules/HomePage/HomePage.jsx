import React from 'react';
import { Map } from 'lodash';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Organization from './Organization';
import Metric from '../../components/Metric';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


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
            {Object.keys(organizations).map((organizationKey, index) => (
                <Organization key={index} organization={ organizations[organizationKey] } />
            ))}
        <h1>Metrics</h1>
        {Object.keys(metrics).map((metricKey, index) => (
            <Metric key={ index } metric={ metrics[metricKey] } />
        ))}
        <Footer />
    </div>)
};

HomePage.propTypes = {
    metrics: PropTypes.shape({}).isRequired,
    organizations: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
    metrics: state.examples.metrics,
    organizations: state.examples.organizations,
});

export default withRouter(connect(
    mapStateToProps,
)(HomePage));
