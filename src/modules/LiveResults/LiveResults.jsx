import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getOrganizations } from '../../ducks/organizations';

const LiveResults = ({ organizations }) => (
  <div>
    <h1>Dashboard</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </p>
    <ul>
      {organizations.map(o => <div key={o.id}>{o.name}</div>)}
    </ul>
  </div>
);
LiveResults.propTypes = {
  organizations: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    organizations: getOrganizations(state),
  }),
  null,
)(LiveResults);
