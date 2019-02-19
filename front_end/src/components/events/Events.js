import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import {connect} from 'react-redux';

const eventsDashboard = [];

class Events extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			users: [],
			events: eventsDashboard,
            isOpen: false,
            selectedEvent: null
		};
	}

	componentDidMount(){
		axios.get('https://production-taco.herokuapp.com/users')
		.then(res => {
			this.setState({
				users: res.data,
			})
		})
	}

	logOut = (event) => {
		event.preventDefault()
		firebase.auth().signOut();
		this.props.history.push("/")
	}

	handleFormOpen = () => {
        this.setState({ 
          selectedEvent: null,
          isOpen: true 
        })
    };
    handleCancel = () => {
        this.setState({ isOpen: false })
    };

    handleEditEvent = (eventToUpdate) => () => {
      this.setState({
        selectedEvent: eventToUpdate,
        isOpen: true
      })

    };


	render() {
		//console.log(this.state)
		return (
			<div>
				<div>Success</div>
				<button onClick={this.logOut}>Sign Out</button>
				<h2>Registerd Accounts</h2>
				<div>
					{this.state.users.map(user => {
						return <div key={user.id}>
							<p>Name: {user.name}</p>
							<p>Email: {user.email}</p>
						</div>
					})}
				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {auth: state.firebase.auth}
}

export default connect(mapStateToProps, null)(Events);