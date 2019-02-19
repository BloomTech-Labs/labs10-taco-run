/* This is where the billing API endpoint will go (Stripe Feature) */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY) // --> initialize stripe
const express = require("express"); // --> intialize express and express router
const router = express.Router();

require("dotenv").config() // --> use the .env file

server.post("", (req, res) => {
  let amount = 1000 // --> $10.00

// --> 1. Create a customer object
  stripe.customers
    .create({
      email: req.body.email,
      card: req.body.id,
      source: "tok_visa",
    })
    .then(customer =>
      stripe.charges.create({ // --> Create a charge with usd
        amount,
        description: "Premium Membership Charge",
        currency: "usd",
        customer: customer.id,
      })
    )
    .then(charge => res.send(charge))
    .catch(err => {
      console.log("Error:", err)
      res.status(500).send({ error: "Purchase Failed" })
    })
})

