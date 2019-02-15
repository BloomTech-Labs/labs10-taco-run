/* 
  - Use the balsamiq design for reference
  - Main concepts for this component:
    - Ability to change email & password
    - Sign out button ?
    - Home button --> redirect to user's event page or maybe for v1.0 the GetStarted Component (we will discuss this as a group)
    - Display User's "Name"
    - Make a button to show Stripe feature (hard code this for now, could just display in an <h1>Stripe Feature</h1>)
*/
import React from 'react';

class UserSettings extends React.Component {
  state = {
    example: ''
  }

  render() {
    return (
      <div className = "user-settings-wrapper">
        <h1>User Settings Page</h1>
      </div>
    );
  } // --> render() brace

} // --> class brace

export default UserSettings;