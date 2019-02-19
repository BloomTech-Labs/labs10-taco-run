/*
  - This is the stripe feature
  - $10/yr :D
  - This will be loaded into the UserSettings component
*/
import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

class Billing extends React.Component {  
  // onToken = token => {
  //   axios.post()
  //     .then(response => alert(response.data.outcome.seller_message))
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <div className = "stripe-checkout-wrapper">
        <h1>Stripe Checkout Here</h1>      
      </div>
    );
  }; // --> render() brace
}; // --> class brace

export default Billing;