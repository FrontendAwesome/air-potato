import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrganization } from '../../ducks/organizations';


export class Donation extends React.Component {
  render() {
    const { organization } = this.props;
    return (
      <div>
        <h1>Donation for {organization.name}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </p>
      </div>
    )
  }
};


Donation.propTypes = {
  organization: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  (state, { match:{params:{organizationKey}} }) => ({
      organization: getOrganization(state, organizationKey),
  }),
  null,
)(Donation);
