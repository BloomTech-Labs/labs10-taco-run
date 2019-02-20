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

	// extra in case you need to reference

	handleChange = event => {
 	   this.setState({[event.target.name]: event.target.value})
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
