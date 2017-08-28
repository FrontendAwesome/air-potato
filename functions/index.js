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
