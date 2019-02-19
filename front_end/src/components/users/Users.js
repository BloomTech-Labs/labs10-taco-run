import React from 'react';
//import axios from 'axios';
import Nav from '../nav/Nav.js'

class Users extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){}



	render() {
		return (
			<div>
				<Nav />
				<div>
					List of Users who user the app
				</div>
			</div>
		)
	}
}

export default Users;
