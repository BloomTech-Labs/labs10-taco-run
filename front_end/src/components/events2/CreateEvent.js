import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/eventsActions";

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
		console.log("Component Did Mount Invoked");
		console.log(this.props);
// --> Get the user_id from localStorage
		this.setState({
			event: {
				user_id: localStorage.getItem("user_id")
			}
		});		
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
	}



	render() {
		return (
			<div>
				<form>
					<input
						type="text"
						placeholder='example'
						onChange={this.handleChange}
						name="example"
						value={this.state.example}
					/>
				</form>
			</div>
		)
	}
}

export default CreateEvent;
