import React from 'react';
import axios from 'axios';
import Nav from '../nav/Nav.js';
import { Card, FlexDiv, ViewEvent } from './eventlist_css.js'
import { Link } from "react-router-dom";

class EventList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			events: []
		};
	}

	componentDidMount(){
		axios.get('https://production-taco.herokuapp.com/events')
		.then(response => {
			console.log(response)
			this.setState({
				events: response.data
			})
		})
	}



	// extra in case you need to reference

	// handleChange = event => {
 	//    this.setState({[event.target.name]: event.target.value})
 	//  }

	//  <form>
	// 	<input
	// 		type="text"
	// 		placeholder='example'
	// 		onChange={this.handleChange}
	// 		name="example"
	// 		value={this.state.example}
	// 	/>
	// </form>

	render() {
		return (
			<div>
				<Nav/>
				<div>
					<div>
						{this.state.events.map(event => {
							return (
								<FlexDiv>
									<Card key={event.id} id={event.id}>
										<p>Event Name: {event.name}</p>
										<p>posted by: {event.author}</p>
										<p>date: {event.date}</p>
										<p>location: {event.location}</p>
										<p>venue: {event.venue}</p>
									</Card>
									<div><Link to={`/events/${event.id}`}><ViewEvent>View Event</ViewEvent></Link></div>
								</FlexDiv>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default EventList;
