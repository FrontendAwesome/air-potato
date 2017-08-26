const functions = require('firebase-functions')
const admin = require('firebase-admin')

//  Const DB refs
admin.initializeApp( functions.config().firebase )
const Organizations = admin.database().ref('Organizations')
const Transactions = admin.database().ref('Transactions')
const Metrics = admin.database().ref('Metrics')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//  When a Transaction is made, update any relevant Organizations and Metrics.
exports.processTransactions = functions.database.ref('/Transactions/{transactId}')
.onCreate( event => {
  const transaction_data = event.data.val()

  //  Update metrics, if any
  Object.keys(transaction_data.pledges).map( key => {
    processMetric(key, transaction_data.org_key, transaction_data.pledges[key])
  })

  //  Update organization
  Organizations.child(transaction_data.org_key).once( 'value' )
  .then( org => {
    const org_data = org.val()

    //  Update transaction count
    org_data.total_transactions++
    Organizations
      .child(`${transaction_data.org_key}/total_transactions`)
      .set( org_data.total_transactions )

    //  Update donation $
    org_data.money_earned.donations += transaction_data.donation
    Organizations
      .child(`${transaction_data.org_key}/money_earned/donations`)
      .set( org_data.money_earned.donations )
  } )

  return
} )

const processMetric = (metric_key, org_key, rate_increase) => {
  let metric_ref = Metrics.child(metric_key)
  metric_ref.once( 'value' )
  .then( metric => {
    let metric_data
    if (!metric.val().org_totals) {
      metric_data = {
        num_pledges: 0,
        rate: 0
      }
      metric_ref.child(`org_totals/${org_key}`).set({})
    } else {
      metric_data = metric.val().org_totals[org_key]
    }
    metric_ref.child(`org_totals/${org_key}/num_pledges`).set( metric_data.num_pledges + 1 )
    metric_ref.child(`org_totals/${org_key}/rate`).set( metric_data.rate + rate_increase )
  })
}

//  @brief  Anytime a Metric is updated, recalculate the contributions from all
//          Metrics for all Organizations.
exports.recomputePledgeTotal = functions.database.ref('/Metrics/{metricId}')
.onWrite( event => {
  Metrics.once('value')
  .then( (metrics) => {
    let metrics_data = metrics.val()

    //  Compute total contribution to each Organization from each Metric.
    return new Promise( (resolve, reject) => {
      let pledge_totals = {}
      // For each metric...
      Object.keys( metrics_data ).map( metric_key => {
        let metric_data = metrics_data[metric_key]
        if( !metric_data.org_totals ) return // Skip metrics with no active pledges!
        Object.keys(metric_data.org_totals).map( org_key => {
          let org_rate = metric_data.org_totals[org_key].rate
          if( pledge_totals[org_key] ) {
            pledge_totals[org_key] += org_rate * metric_data.total_metric_value
          } else {
            pledge_totals[org_key] = org_rate * metric_data.total_metric_value
          }
        })
      })
      resolve( pledge_totals )
    } )
    .then( pledge_totals => {
      // Update each Org!
      Object.keys( pledge_totals ).map( org_key => {
        Organizations.child(org_key).child('money_earned/pledges')
          .set(pledge_totals[org_key])
      })
    } )
  })
  .catch( (e) => {
    console.error(`recomputePledgeTotal error:`, e)
  })
} )

//  @brief  If anything is updated in an Organization, recompute its
//          total earnings!
exports.recomputeOrgTotal = functions.database.ref('/Organizations/{orgId}')
.onWrite( event => {
  let org_data = event.data.val()
  org_data.money_earned.total = org_data.money_earned.pledges +  org_data.money_earned.donations
  event.data.ref.child('money_earned/total').set( org_data.money_earned.total )
})
