import React from 'react';
import './Organization.css';

const Organization = (props) => {
  let {organization} = props
  return (
    <article className="live-organization">
      <h2 className="live-organization__title">{organization.name}</h2>
      <div className="live-organization__raised">${organization.money_earned.total}</div>
    </article>
  );
}

export default Organization;
