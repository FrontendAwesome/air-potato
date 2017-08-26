import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
        <h1>organizations</h1>
        <ul>
            {organizations.map((organization, index) => (
                <li key={index}>{organization.name}</li>
            ))}
        </ul>
        <h1>Metrics</h1>
        <ul>
        {metrics.map((metric, index) => (
            <li key={index}>{metric.metric_unit}</li>
        ))}
        </ul>
        <Footer />
    </div>)
};

HomePage.propTypes = {
    metrics: PropTypes.array.isRequired,
    organizations: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    metrics: state.examples.metrics,
    organizations: state.examples.organizations,
});

export default withRouter(connect(
    mapStateToProps,
)(HomePage));
