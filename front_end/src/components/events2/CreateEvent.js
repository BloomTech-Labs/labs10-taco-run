import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/eventsActions";
import GoogleMapReact from 'google-map-react';
import axios from 'axios'
import { withAlert } from 'react-alert'
import './create_event.css'
import Popup from 'reactjs-popup'
import Nav from "../nav/Nav.js";
import Big from 'big.js';
import firebase from 'firebase';

import { 
	CreateEventWrapper, 
	FormElement, 
	LabelElement, 
	InputElement,
	FormHeader,
	SubmitButton,
	YelpDiv,
	CenterP,
	FlexForm,
	MapDiv
} from "./create_event_css.js";


const TacoLocation = ({ text }) => <div>{text}</div>;

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
			tacos_places: [],
			destinations: [],
			zoom: 11,
			lat_av: 0,
			lon_av: 0,
			show_map: false
		};
	}

	componentDidMount(){}	

	handleChange = event => {
 	   this.setState({[event.target.name]: event.target.value})
 	 }

	searchMap = event => {
		event.preventDefault();
		let key = firebase.functions().app_.options_.yelpKey

		let city = this.state.city_location
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=taco&location=${city}&categories=mexican`, {
      headers: {
        Authorization: `Bearer ${key}`
      },
    })
    .then(res => {
      console.log(res)

      let destinations = []
      let obj
      let biz = res.data.businesses
      let lat_ar = []
      let lon_ar = []

      for (let i = 0; i < biz.length; i++){
      	obj = {lat: biz[i].coordinates.latitude, lon: biz[i].coordinates.longitude, number: i + 1}
      	lat_ar.push(biz[i].coordinates.latitude)
      	lon_ar.push(biz[i].coordinates.longitude)
      	destinations.push(obj)
      }

			const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
			    
			const av_lat = average(lat_ar)
			const av_lon = average(lon_ar)

      this.setState({
      	city_location: '',
      	tacos_places: res.data.businesses,
      	destinations: destinations,
	      lat_av: av_lat,
				lon_av: av_lon,
				show_map: true
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

	handleSubmit = (obj) => {	

		let event_obj = {
			user_id: parseInt(localStorage.getItem("user_id"), 10), 
			author: this.props.auth.displayName,
			name: this.state.name,
			date: this.state.date,
			location: obj.location,
			lat: obj.lat,
			lon: obj.lon,
			img_url: obj.img_url,
			raiting: obj.raiting,
			price: obj.price,
			url: obj.url,
			venue: obj.name,
			total_comments: 0,
			total_users: 1,
			posters_email: this.props.auth.email
		}

		this.props.createEvent(event_obj);
		this.props.history.push("/events");
	};

	render() {
		console.log(this.state)
		console.log(this.props)
		return (	
			<div className = "create-event-full-wrapper">
				<div className = "navigation-wrapper">
						<Nav />
				</div>

				{this.state.show_map ? (
						<MapDiv>
							<GoogleMapReact
			          bootstrapURLKeys={{ key: firebase.functions().app_.options_.googleKey }}
			          defaultZoom={this.state.zoom}
			          defaultCenter={{lat: this.state.lat_av, lng: this.state.lon_av}}
			        >
				    		{this.state.destinations.map(d => {
				    			return (
				      			<TacoLocation
				              lat={d.lat}
				              lng={d.lon}
				              text={d.number}
				            />
				  				)
				    		})}
			        </GoogleMapReact>
			      </MapDiv>
					) : 
					null
				}

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
							{this.state.tacos_places.map((t, idx) => {
								return (
										<YelpDiv key={t.id}>
											<p>{idx + 1}</p>
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
												  	<p 
												  		onClick={() => {this.handleSubmit({
													  		lat: t.coordinates.latitude,
													  		lon: t.coordinates.longitude, 
													  		name: t.name,
													  		img_url: t.image_url,
													  		location: `${t.location.display_address[0]} ${t.location.display_address[1]}`,
													  		raiting: t.rating,
													  		price: t.price,
													  		url: t.url
												  		})}}>Create Event
												  	</p>
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

