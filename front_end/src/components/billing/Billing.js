/*
  - This is the stripe feature
  - $10/yr :D
  - This will be loaded into the UserSettings component
*/
import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

class Billing extends React.Component {
  constructor(){
    super();
    this.state = {
      usersEmail: '',
      isPrem: ''
    };
  }

  onToken = token => {
    axios.post()
      .then(response => alert(response.data.outcome.seller_message))
      .catch(err => console.log(err));
  };

  componentDidMount(){
    let id = localStorage.getItem("user_id")
    axios.get(`https://production-taco.herokuapp.com/users/${id}/info`)
    .then(response => {
      console.log(response)
      this.setState({
        usersEmail: response.data.email,
        isPrem: response.data.isPremium
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>

      {this.state.isPrem ? (
          <p>all paid for the year enjoy</p>
      ) : 

        <div className = "stripe-checkout-wrapper">
          <h1>Upgrade Account here</h1>
          <p>
            for only 10 dollars we can have your account upgraded
            to invite over 10 people to a taco event
          </p>
          <StripeCheckout
            email={this.state.usersEmail}
          />      
        </div>
      }
      </div>

    );
  }; // --> render() brace
}; // --> class brace

export default Billing;