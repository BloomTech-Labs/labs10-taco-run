import React from 'react';
//import axios from 'axios';
import firebase from 'firebase';
import {connect} from 'react-redux';

class Events extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){}

	logOut = (event) => {
		event.preventDefault()
		firebase.auth().signOut();
		this.props.history.push("/")
	}

	render() {
		console.log(this.props)
		return (
			<div>
				<div>Success</div>
				<button onClick={this.logOut}>Sign Out</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {auth: state.firebase.auth}
}

export default connect(mapStateToProps, null)(Events);