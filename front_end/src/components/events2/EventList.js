import React from 'react';
import axios from 'axios';
import Nav from '../nav/Nav.js';
import { Card, FlexDiv, ViewEvent, DispayComments, CreateLink, ContainLink } from './eventlist_css.js'
import { Link } from "react-router-dom";
import { getEvents } from "../../store/actions/eventsActions";
import { connect } from "react-redux";
import './create_event.css'

class EventList extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		this.props.getEvents()
	}
	
	render() {
		console.log(this.props.events)
		return (

			<div>
				<Nav/>
				<div>
					<ContainLink>
						<Link to="events_create"><CreateLink>Create Event</CreateLink></Link>
					</ContainLink>
					<div>
						{this.props.events.map(event => {
							return (
								<FlexDiv key={event.id}>
									<Card id={event.id}>
										<p><img className="yelp_img" src={event.img_url}/></p>
										<p>Event Name: {event.name}</p>
										<p>posted by: {event.author}</p>
										<p>date: {event.date}</p>
										<p>location: {event.location}</p>
										<p>venue: {event.venue}</p>
										<p>raiting: {event.raiting}</p>
										<p>price: {event.price}</p>
										<p>total attemding: {event.total_users}</p>
										<p><a href={event.url}>Yelp Link</a></p>
									</Card>
									<DispayComments >
										<p>comments<br/> {event.total_comments}</p>
									</DispayComments>
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

const mapStateToProps = state => {
  return {
    events: state.eventsReducer.events,
  };
};

export default connect(mapStateToProps, {getEvents})(EventList);