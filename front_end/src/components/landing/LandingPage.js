/* 
  - This is the landing page:
    - This will be before the user logs in
    - Describes our product and what it does
  - Load the navigation COMPONENT in some sort of <header></header>
  - Follow the style guide templates we made as a group
*/
import React from 'react';
import Navigation from '../navigation/Navigation.js';

class LandingPage extends React.Component {
  state = {
    example: ''
  }

  render() {
    return (
      <div className = "landing-wrapper">
        <header>
          <p>Load the Navigation Component :D</p>
        </header>
        <div className = "landing-page-content">
          <p>Description Here</p>
        </div>
      </div>
    );
  } // --> render() brace

} // --> class brace

export default LandingPage;