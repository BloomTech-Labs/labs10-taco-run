import './css/main.css'
import './custom.css'

import React from 'react';
import Navigation from '../navigation/Navigation.js';
import places from './img/places.png'
import events from './img/event.png'
import medias from './img/SocialMedia.png'
import { Link } from 'react-router-dom'

//banner-content


class LandingPage extends React.Component {
  state = {
    example: ''
  }

  render() {
    return (
      <div>
        <section class="customb relative">
          <div class="container">
            <div class="row fullscreen d-flex align-items-center justify-content-start">
              <div class="banner-content col-lg-8 col-md-12" >
                <h1 id="colorf">
                  Lets Get Taco's          
                </h1>
                <Link to="/auth"><div class="primary-btn header-btn text-uppercase">Register</div></Link>
              </div>                        
            </div>
          </div>
        </section>

        <section class="top-dish-area section-gap" id="dish">
          <div class="container">
            <div class="row d-flex justify-content-center">
              <div class="menu-content pb-60 col-lg-8">
                <div class="title text-center">
                  <h1 class="mb-10">Welcome</h1>
                  <p>We are A scheduling app for people to meet up and eat tacos.</p>
                </div>
              </div>
            </div>            
            <div class="row">
              <div class="single-dish col-lg-4 alignI">
                <div class="thumb">
                  <img src={places} className="imgs"/>
                </div>
                <h4 class="text-uppercase pt-20 pb-20">Google Places API</h4>
                <p>
                  Our App integrades with google Places API to help you find places to eat Tacos in your area.
                </p>
              </div>
              <div class="single-dish col-lg-4 alignI">
                <div class="thumb">
                  <img src={events} className="imgs"/>
                </div>
                <h4 class="text-uppercase pt-20 pb-20">Make Events</h4>
                <p>
                  Once you found a place you like make an event for others to go and eat tacos, invite friends, and add favorite places that you ate at.
                </p>
              </div>
              <div class="single-dish col-lg-4 alignI">
                <div class="thumb">
                  <img src={medias} className="imgs"/>
                </div>
                <h4 class="text-uppercase pt-20 pb-20">Link Events to Social Media</h4>
                <p>
                  Our app interacts with Facebook, Twitter, and Google so that you can share events with your other social media accounts.
                </p>
              </div>                        
            </div>
          </div>  
        </section>
      </div>
    );
  } 

} 

export default LandingPage;