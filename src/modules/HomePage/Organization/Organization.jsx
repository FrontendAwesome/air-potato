import React from 'react';
import './Organization.css';

const Organization = (props) => {
  const { organization } = props;
  return (
    <article className="organization">
      <h2 className="organization__title">{organization.name}</h2>
      <div className="organization__below">
        <div className="organization__raised">
          <span className="organization__raised--amount">${organization.money_earned.total.toFixed(2)}</span>
          <span className="organization__raised--text"> Raised by </span>
          <span className="organization__pledged--count">{organization.total_transactions}</span>
          <span className="organization__pledged--unit"> People</span>
        </div>
      </div>
      <div className="organization__below">
        <div className="organization__pledged">
          <span className="organization__pledged--amount">${organization.money_earned.pledges.toFixed(2)}</span>
          <span className="organization__pledged--text"> Pledged / </span>
          <span className="organization__pledged--amount">${organization.money_earned.donations.toFixed(2)}</span>
          <span className="organization__pledged--text"> Donated</span>
        </div>
      </div>
      <div className="organization__below">
        <div className="organization__pledged">
        </div>
      </div>
      <button type="button" className="organization__donate">Pledge or Donate Now</button>
    </article>
  )
};

export default Organization;
