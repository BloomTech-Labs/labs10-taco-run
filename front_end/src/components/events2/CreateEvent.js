import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/eventsActions";

import Nav from "../nav/Nav.js";
import { CreateEventWrapper, FormElement, LabelElement, InputElement } from "./create_event_css.js";

class CreateEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			event: {
				name: '',
				date: '',	
				location: '',
				venue: '',
				author: '',
				user_id: ''
			} // --> event object				
		};
	} // --> constructor

	componentDidMount(){		
// --> Get the user_id from localStorage
		this.setState({
			event: {
				user_id: parseInt(localStorage.getItem("user_id"), 10), // --> parseInt() since the user_id comes up as a string and not a number
				author: this.props.auth.displayName // --> this comes from firebase-auth
			}
		});
		console.log(this.state.event);
	};	

	handleChange = event => {
		event.preventDefault();
// --> Destructure name and value to reduce code clutter
		const { name, value } = event.target;		
		this.setState({
			event: {
				...this.state.event,
				[name]: value
			}
		});
	 };
	 
	handleSubmit = event => {
		event.preventDefault();
// --> Use the createEvent() from actions & pass in the event object as param						
		this.props.createEvent(this.state.event);		
		this.props.history.push("/events"); // --> redirect to dashboard
	};



	render() {
		return (	
			<div className = "create-event-full-wrapper">
				<div className = "navigation-wrapper">
						<Nav />
				</div>
				<CreateEventWrapper>				
					<FormElement onSubmit = {this.handleSubmit}>

						<LabelElement for = "event-name">Event Name</LabelElement>
						<InputElement 
							name = "name"
							onChange = {this.handleChange}
							value = {this.state.event.name}
							type = "text"	
							id = "event-name"					
						/>

						<LabelElement for = "event-date">Event Date</LabelElement>
						<InputElement 
							name = "date"
							onChange = {this.handleChange}
							value = {this.state.event.date}
							type = "date"	
							id = "event-date"					
						/>

						<LabelElement for = "event-location">Event Location</LabelElement>
						<InputElement 
							name = "location"
							onChange = {this.handleChange}
							value = {this.state.event.location}
							type = "text"	
							id = "event-location"					
						/>

						<LabelElement for = "event-venue">Venue / Building</LabelElement>
						<InputElement 
							name = "venue"
							onChange = {this.handleChange}
							value = {this.state.event.venue}
							type = "text"	
							id = "event-venue"					
						/>

						<LabelElement for = "event-author">Event Author</LabelElement>
						<InputElement 
							name = "author"
							onChange = {this.handleChange}
							value = {this.state.event.author}
							type = "text"	
							id = "event-author"					
						/>

						<button type = "submit">Submit</button>

					</FormElement>
				</CreateEventWrapper>
			</div>
		)
	} // --> render() brace
} // --> class brace

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, { createEvent })(CreateEvent);
