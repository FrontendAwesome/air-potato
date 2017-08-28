import React from 'react';
import _ from 'lodash'
import './Organization.css';

const Organization = (props) => {
  let {organization, metrics} = props
  let donated_money = organization.money_earned.donations
  let pledged_money = 0
  let org_metrics = _.filter(metrics, m => m.org_totals[organization.id])
  for( let metric of org_metrics ) {
    pledged_money += metric.org_totals[organization.id].rate * metric.total_metric_value
  }
  let total_money = donated_money + pledged_money

  return (
    <article className="live-organization">
      <h2 className="live-organization__title">{organization.name}</h2>
      <div className="live-organization__raised">${total_money}</div>
    </article>
  );
}

export default Organization;
