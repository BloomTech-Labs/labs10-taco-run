/* 
  - Have two tabs:
    1. Favorite locations (name & location)
    2. Friends (name & location)
*/
import React from 'react';

class UserProfile extends React.Component {
  state = {
    example: ''
  }

  render() {
    return (
      <h1>UserProfile Page !</h1>
    );
  } // --> render() brace
} // --> class brace

export default UserProfile;