import React from 'react';

const Organization = (props) => {
  const { organization } = props;
  return (
    <article className="organization">
      <h2 className="organization__title">{organization.name}</h2>
      <div class="organization__below">
        <div class="organization__raised">
          <span class="organization__raised--amount">$2,450</span>
          <span class="organization__raised--text"> Raised</span>
        </div>
        <div class="organization__pledged">
          <span class="organization__pledged--amount">$2,450</span>
          <span class="organization__pledged--text"> Pledged by </span>
          <span class="organization__pledged--count">127</span>
          <span class="organization__pledged--unit"> People</span>
        </div>
      </div>
      <button type="button">Pledge or Donate Now</button>
    </article>
  )
};

export default Organization;
