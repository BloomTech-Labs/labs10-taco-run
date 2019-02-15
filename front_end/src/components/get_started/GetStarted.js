/* 
  - This is the first page the user gets redirected to once they login / signup
  - I would load buttons that redirect directly to other endpoints
    - events page
    - etc.
*/
import React from 'react';

class GetStarted extends React.Component {
  state = {
    example: ''
  }

  render() {
    return (
      <h1>GetStarted Page !</h1>
    );
  } // --> render() brace
} // --> class brace

export default GetStarted;