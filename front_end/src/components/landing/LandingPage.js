import './custom.css'

import React from 'react';
import yelp from './img/yelp.jpg'
import events from './img/event.png'
import tacos from './img/tacos.jpg'
import tacos2 from './img/tacos2.jpeg'
import facebook from './img/facebook.png'
import google from './img/google.png'
import twitter from './img/twitter.png'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';


import {connect} from 'react-redux';
import {facebookAuth, twitterAuth, googleAuth} from '../../store/actions/authActions.js';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  media2: {
    height: 350,
  },
};

const LandingPage = (props) => {
  const { classes } = props;
  return (
      <div>
        <section>
          <div>
            <div className="flexCenter">
              <Card className={`width`}>
                <CardActionArea>
                  <CardMedia
                    className={`${classes.media2} imgs`}
                    image={tacos2}
                    title="Lets Get Tacos"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lets Get Tacos
                    </Typography>
                    <Typography component="p">
                      We are A scheduling app for people to meet up and eat tacos.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            
            <h4 className="centerT">Login With</h4>
            <div className="flexCenter bottom">
              <img src={facebook} className="image" alt="facebook-provider-img" onClick={() => { props.facebookAuth(); props.history.push('/events_create') } }/>
              <img src={google} className="image" alt="google-provider-img" onClick={() => { props.googleAuth(); props.history.push('/events_create') } }/>
              <img src={twitter} className="image" alt="twitter-provider-img" onClick={() => { props.twitterAuth(); props.history.push('/events_create') } }/>
            </div>          

            <div className="flexContain">
              <Card className={`${classes.card} media_spacing`}>
                <CardActionArea>
                  <CardMedia
                    className={`${classes.media} imgs`}
                    image={yelp}
                    title="Yelp and Google Maps API"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Yelp and Google Maps Api
                    </Typography>
                    <Typography component="p">
                      Our App integrades with Yelp and the Google Maps API to 
                      help you find the best places to eat tacos in your local city.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              
              <Card className={`${classes.card} media_spacing`}>
                <CardActionArea>
                  <CardMedia
                    className={`${classes.media} imgs`}
                    image={events}
                    title="Make an Event"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Schedule an Event
                    </Typography>
                    <Typography component="p">
                      Once you found a place you like make an event 
                      for others to go and eat tacos, 
                      invite friends, and add favorite places that you ate at.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card className={`${classes.card} media_spacing`}>
                <CardActionArea>
                  <CardMedia
                    className={`${classes.media} imgs`}
                    image={tacos}
                    title="Enjoy your Tacos"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Enjoy your tacos
                    </Typography>
                    <Typography component="p">
                      Once you have your event made, 
                      invite your friends, meetup 
                      and enjoy some tasty tacos!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>  
        </section>
      </div>
    );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    error: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    twitterAuth: () => dispatch(twitterAuth()),
    facebookAuth: () => dispatch(facebookAuth()),
    googleAuth: () => dispatch(googleAuth()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandingPage));
