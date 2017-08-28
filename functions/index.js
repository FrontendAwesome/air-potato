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
  Object.keys(transaction_data.pledges).map( metric_key => {
    Metrics.child(`${metric_key}/org_totals/${transaction_data.org_key}`)
    .transaction( org_total => {
      if ( org_total ) {
        org_total.num_pledges += 1
        org_total.rate += transaction_data.pledges[ metric_key ]
      } else {
        org_total = {
          num_pledges: 1,
          rate: transaction_data.pledges[ metric_key ]
        }
      }
      return org_total
    })
  })

  //  Update Organization
  Organizations.child(`${transaction_data.org_key}/total_transactions`)
  .transaction( total_transactions => {
    return (total_transactions || 0) + 1
  } )
  if( transaction_data.donation ) {
    Organizations.child(`${transaction_data.org_key}/money_earned/donations`)
    .transaction( donations => {
      return (donations || 0) + transaction_data.donation
    } )
  }

  return
} )

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
