import React from 'react';
import './Organization.css';

const Organization = (props) => {
  const { organization } = props;
  return (
    <article className="organization">
      <h2 className="organization__title">{organization.name}</h2>
      <div className="organization__below">
        <div className="organization__raised">
          <span className="organization__raised--amount">$2,450</span>
          <span className="organization__raised--text"> Raised</span>
        </div>
        <div className="organization__pledged">
          <span className="organization__pledged--amount">$2,450</span>
          <span className="organization__pledged--text"> Pledged by </span>
          <span className="organization__pledged--count">127</span>
          <span className="organization__pledged--unit"> People</span>
        </div>
      </div>
      <button type="button" className="organization__donate">Pledge or Donate Now</button>
    </article>
  )
};

export default Organization;
