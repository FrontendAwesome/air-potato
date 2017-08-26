import React from 'react';
import { NavLink } from 'react-router-dom';

const NoMatch = () => (
  <div>
    <h1>No Match</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </p>
    <div>
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      </ul>
    </div>
  </div>
);

export default NoMatch;
