import React from 'react';
import {MainNav, LeftNav, RightNav} from './nav_css.js'
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
	constructor(){
		super();
		this.state = {};
	}

	componentDidMount(){}

	//the styling change from add Link to was giving me a headache so I did this

	events = () => {
		this.props.history.push("/events")
	}

	profile = () => {
		this.props.history.push("/user-profile")
	}

	users = () => {
		this.props.history.push("/users")
	}

	create = () => {
		this.props.history.push("/create-event")
	}

	started = () => {
		this.props.history.push("/get-started")
	}

	render() {
		return (
			<MainNav>
				<LeftNav id="noHover">
					<p>Lets Get Tacos</p>
				</LeftNav>
				<RightNav>
					<p onClick={this.started}>Started</p>
					<p onClick={this.events}>Events</p>
					<p onClick={this.profile}>Profile</p>
					<p onClick={this.users}>Users</p>
					<p onClick={this.create}>Make Event</p>
				</RightNav>
			</MainNav>
		)
	}
}

export default withRouter(Nav);
