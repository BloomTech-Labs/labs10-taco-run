import React, { Component } from 'react';
import Auth from './components/auth/Auth.js';
import NotAuth from './components/auth/NotAuth';
import NoPage from './components/404/NoPage.js';
import { Route, withRouter } from 'react-router-dom';
import Events from './components/events/Events.js';
import {connect} from 'react-redux';
import { Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
      		{this.props.auth.isEmpty? (
      			<Switch>
      				<Route exact path='/' component={Auth}/>
      				<Route component={NotAuth}/>
      			</Switch>
      		) : 
      		<div>
      			<Switch>
		      		<Route exact path='/' component={Auth}/>
		      		<Route exact path='/events' component={Events}/>
		      		<Route component={NoPage}/>
		      	</Switch>
	      	</div>
      	}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {auth: state.firebase.auth}
}

export default connect(mapStateToProps, null)(withRouter(App));
