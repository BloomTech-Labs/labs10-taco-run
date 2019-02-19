import React, { Component } from "react";
import Auth from "./components/auth/Auth.js";
import NotAuth from "./components/auth/NotAuth";
import NoPage from "./components/404/NoPage.js";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

// --> Components List
import LandingPage from "./components/landing/LandingPage";
import UserSettings from "./components/user/UserSettings";
import GetStarted from "./components/get_started/GetStarted";
import Events from "./components/events/EventDashboard/Events";
import SingleEvent from "./components/events/SingleEvent";
import UserProfile from "./components/user/UserProfile";
import Users from "./components/users/Users.js";
import CreateEvent from './components/events/CreateEvent.js';

class App extends Component {
  render() {
    return (
      <div>

      		{this.props.auth.isEmpty? (
      			<Switch>
              <Route exact path = '/' component={LandingPage} />
      				<Route exact path='/auth' component={Auth}/>
      				<Route component={NotAuth}/>
      			</Switch>
      		) : 
      		<div>
      			<Switch>							
		      		<Route exact path = '/events' component={Events} />
							<Route exact path = '/user-settings' component = {UserSettings} />
							<Route exact path = '/get-started' component = {GetStarted} />
							<Route exact path = '/single-event' component = {SingleEvent} />
							<Route exact path = '/user-profile' component = {UserProfile} />	
              <Route exact path = '/create-event' component = {CreateEvent} />
              <Route exact path = '/users' component = {Users} />			
		      		<Route component={NoPage}/>
		      	</Switch>
	      	</div>
      	}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};


export default withRouter(connect(mapStateToProps, null)(App));