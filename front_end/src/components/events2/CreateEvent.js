import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/eventsActions";
import GoogleMapReact from 'google-map-react';
import axios from 'axios'
import { withAlert } from 'react-alert'
import './create_event.css'
import Popup from 'reactjs-popup'

import Nav from "../nav/Nav.js";
import { 
	CreateEventWrapper, 
	FormElement, 
	LabelElement, 
	InputElement,
	FormHeader,
	SubmitButton,
	YelpDiv,
	CenterP,
	FlexForm
} from "./create_event_css.js";

class CreateEvent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			date: '',	
			location: '',
			venue: '',
			author: '',
			user_id: '',
			city_location: '',
			tacos_places: []
		};
	}

	componentDidMount(){}	

	handleChange = event => {
 	   this.setState({[event.target.name]: event.target.value})
 	 }

	searchMap = event => {
		event.preventDefault();

		let city = this.state.city_location
		console.log(city)
		let key = 'eCOPaZqiSLjMpzeQ959HILnzlPZnycqXnrXSynQOss8s-AmvlqkZBSples27Q_KQTqpDm0NuP4HbfRoytRzE_YPg1y2_1NlZrhMaQ46TpXNuZ3zydPTrutbb9XVvXHYx'
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=taco&location=${city}&categories=mexican`, {
      headers: {
        Authorization: `Bearer ${key}`
      },
    })
    .then(res => {
      console.log(res)
      this.setState({
      	city_location: '',
      	tacos_places: res.data.businesses
      })
    })
    .catch(error => {
    	this.props.alert.show("invalid city")
      console.log(error)
      this.setState({
      	city_location: '',
      })
    })
	}

	handleSubmit = event => {
		event.preventDefault();			
		console.log(event.target)
		return	
		this.props.createEvent(this.state.event);		
		this.props.history.push("/events");
	};

	render() {
		console.log(this.state)
		return (	
			<div className = "create-event-full-wrapper">
				<div className = "navigation-wrapper">
						<Nav />
				</div>
				<CreateEventWrapper>
						<FormElement onSubmit={this.searchMap}>
							<InputElement
								name="city_location"
								onChange={this.handleChange}
								value={this.state.city_location}
								type="text"
								placeholder="look up taco places by city"
							/>
							<SubmitButton onClick={this.searchMap}>Submit</SubmitButton>
						</FormElement>

						<div>
							{this.state.tacos_places.map(t => {
								return (
										<YelpDiv key={t.id}>
											<p>Name: {t.name}</p>
											<p><img className="yelp_img" src={t.image_url}/></p>
											<p>Location: {`${t.location.display_address[0]} ${t.location.display_address[1]}`}</p>
											<p>Rating: {t.rating}</p>
											<p>Price: {t.price}</p>
											<p><a href={t.url}>View on Yelp</a></p>

											<Popup trigger={<div><CenterP>CREATE EVENT</CenterP></div>} modal>
									  		{close => {
										  		return <FlexForm>
										  			<div>
										  				<div></div>
											  			<p onClick={close}>X</p>
										  			</div>
												  	<input
												  		type="text"
												  		name="name"
												  		placeholder="event name"
												  		onChange={this.handleChange}
												  	/>
												  	<input
												  		type="date"
												  		name="date"
												  		placeholder="event date"
												  		onChange={this.handleChange}
												  	/>
												  	<button 
												  		lat={t.coordinates.latitude} 
												  		lon={t.coordinates.longitude} 
												  		name={t.Name}
												  		img_url={t.image_url}
												  		location={`${t.location.display_address[0]} ${t.location.display_address[1]}`}
												  		raiting={t.rating}
												  		price={t.price}
												  		url={t.url}
												  		onClick={this.handleSubmit}>Create Event
												  	</button>
												  </FlexForm>
									  		}}									  
											</Popup>

										</YelpDiv>
									)
							})}
						</div>
				</CreateEventWrapper>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, { createEvent })(withAlert()(CreateEvent));





						// {this.state.city_lookup ? (
						// 		<FormElement onSubmit = {this.handleSubmit}>
						// 			<FormHeader>Create An Event</FormHeader>
						// 			<LabelElement for ="event-name">Name</LabelElement>
						// 			<InputElement 
						// 				name = "name"
						// 				onChange = {this.handleChange}
						// 				value = {this.state.name}
						// 				type = "text"	
						// 				placeholder = "Event Name "				
						// 			/>
						// 			<LabelElement for = "event-date">Event Date</LabelElement>
						// 			<InputElement 
						// 				name = "date"
						// 				onChange = {this.handleChange}
						// 				value = {this.state.date}
						// 				type = "date"										
						// 			/>
						// 			<SubmitButton type="submit">Submit</SubmitButton>
						// 		</FormElement>
						// 	) : 
						// 	null
						// }