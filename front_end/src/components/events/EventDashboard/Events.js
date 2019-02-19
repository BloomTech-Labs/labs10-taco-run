import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {deleteEvent} from '../../store/actions/eventActions.js';
import EventList from '../EventList/EventList';
import cuid from 'cuid';


const eventsDashboard = [];

const actions = {
  deleteEvent
};


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
		let id = localStorage.getItem("user_id")
		axios.get(`https://production-taco.herokuapp.com/users${id}`)
		.then(res => {
			this.setState({
				users: res.data,
			})
		})
	}

	handleFormOpen = () => {
		this.setState({
			selectedEvent: null,
			isOpen: true
		});
	};

	handleCancel = () => {
		this.setState({
			isOpen: false
		});
	};

	handleUpdateEvent = (updatedEvent) => {
		this.setState({
			events: this.state.events.map(event => {
				if (event.id === updatedEvent.id) {
					return Object.assign({}, updatedEvent)
				} else {
					return event
				}
			}),
			isOpen: false,
			selectedEvent: null
		})
	}

	handleOpenEvent = (eventToOpen) => () => {
		this.setState({
			selectedEvent: eventToOpen,
			isOpen: true
		})
	} 

	handleCreateEvent = (newEvent) => {
		let id = cuid();
		let hostPhotoURL = '/assets/user.png';
		const updatedEvents = [...this.state.events, newEvent];
		this.setState({
			events: updatedEvents,
			isOpen: false
		})
	}

	handleDeleteEvent = (eventId) => () => {
		const updatedEvents = this.state.events.filter(e => e.id !== eventId);
		this.setState({
			events: updatedEvents
		})
	}



	render() {
		//console.log(this.state)
		return (
			<Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} events={this.state.events} />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		events: state.events
	}
};

export default connect(mapStateToProps, actions)(Events);