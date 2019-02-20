/* This is where the billing API endpoint will go (Stripe Feature) */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // --> initialize stripe
const express = require("express"); // --> intialize express and express router
const router = express.Router();
const db = require("../config.js");

require("dotenv").config(); // --> use the .env file
router.use(require("body-parser").text()); // --> add body-parser for stripe


router.post('', (req, res) => {
  let amount = 500

  stripe.customers
    .create({
      email: req.body.email,
      card: req.body.id,
      source: 'tok_visa',
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Sample Charge',
        currency: 'usd',
        customer: customer.id,
      })
    )
    .then(charge => res.send(charge))
    .catch(err => {
      console.log('Error:', err)
      res.status(500).send({ error: 'Purchase Failed' })
    })
})





// router.post("", (req, res) => {

//   const {email} = req.body

//   db('users')
//     .where({email})
//     .update({isPremium: true})
//     .then(res => {
//       console.log(res)
//       let amount = 1000 // --> $10.00
//       stripe.customers
//       .create({
//         email: req.body.email,
//         card: req.body.id,
//         source: "tok_visa",
//       })
//       .then(customer =>
//         stripe.charges.create({ // --> Create a charge with usd
//         amount,
//         description: "Premium Membership Charge",
//         currency: "usd",
//         customer: customer.id,
//       })
//       .then(charge => res.send(charge))
//       .catch(error => { // the catch for error with stripe
//         console.log(error)
//       })
//     )
    
//     .catch(err => { // the catch for error with finding user
//       console.log(err)
//     })
//   })
// })

module.exports = router;