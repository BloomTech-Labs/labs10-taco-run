import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/eventsActions";
import "./create_event.css";
import DrawerBar from "../drawer/Drawer";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

import firebase from 'firebase';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { MapDiv, YelpDiv, MapDiv2 } from "./create_event_css.js";
import Select from 'react-select'
import SelectUSState from 'react-select-us-states';
import { withAlert } from 'react-alert';

import taco_buddies from './t_friends.jpg';

import Modal from 'react-awesome-modal';

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import { CreateEventWrapper, FlexForm } from "./create_event_css.js";

import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  grid: {
    width: "100%",
    borderRadius: 10,
    padding: 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit,
    width: "60%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '700px',
    width: '100%',
    margin: '0 auto'
  },
  bottom: {
    marginBottom: 0,
    marginTop: 10
  },
  media: {
    height: 40,
  },
  noHref: {
    textDecoration: 'none'
  },
  margL: {
    marginLeft: "1%"
  }
});

//root2

const TacoLocation = ({ text }) => <div>{text}</div>;

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedDate: new Date(),
      author: "",
      user_id: "",
      checkedInvite: false,
      checkedNoInvite: true,
      invite_only: true,
      posters_email: "",
      show_map: false,
      show_map2: false,
      city_location: "",
      taco_places: [],
      destinations: [],
      zoom: 13,
      lat_av: 0,
      lon_av: 0,
      currentPage: 1,
      tacosPerPage: 6,
      byCity: "",
      venueName: "",
      street: "",
      venue: "",
      usState: "",
      usCity: '',
      singleVenue: '',
      value: 0,
      selected_venue: "",
      setVenue: '',
      bottom_0: "moreBottom",
      visible : false
    };
    this.setNewValue = this.setNewValue.bind(this);
  }

  componentDidMount() {
    console.log(`checkedInvite is: ${this.state.checkedInvite}`);
  }

  setNewValue(state) {
    this.setState({
      usState: state
    })
  }

  changeHandler = value => {
    this.setState({ value })
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked });
    console.log(`${[name]}: ${event.target.checked}`);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = obj => {
    let event_obj = {
      name: this.state.name,
      date: this.state.selectedDate,
      venue: null,
      location: null,
      author: this.props.auth.displayName,
      user_id: parseInt(localStorage.getItem("user_id"), 10),
      posters_email: this.props.auth.email,
      invite_only: this.state.checkedInvite,
      posters_pic: this.props.auth.photoURL
    };
    this.props.createEvent(event_obj);
    this.props.history.push("/events");
  };

  searchMap = event => {

    this.setState({
      show_map: false,
      taco_places: []
    }, () => {

    let key = firebase.functions().app_.options_.yelpkey;
    let city = this.state.byCity;

    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?term=taco&location=${city}&categories=mexican`,
        {
          headers: {
            Authorization: `Bearer ${key}`
          }
        }
      )
      .then(res => {
        console.log(res);

        let destinations = [];
        let obj;
        let biz = res.data.businesses;
        let lat_ar = [];
        let lon_ar = [];

        for (let i = 0; i < biz.length; i++) {
          obj = {
            lat: biz[i].coordinates.latitude,
            lon: biz[i].coordinates.longitude,
            name: biz[i].name
          };
          lat_ar.push(biz[i].coordinates.latitude);
          lon_ar.push(biz[i].coordinates.longitude);
          destinations.push(obj);
        }

        const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

        const av_lat = average(lat_ar);
        const av_lon = average(lon_ar);

        this.setState({
          city_location: "",
          taco_places: res.data.businesses,
          destinations: destinations,
          lat_av: av_lat,
          lon_av: av_lon,
          show_map: true
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          city_location: ""
        });
      });
    })
  };


  searchSingle = (event) => {
    let key = firebase.functions().app_.options_.yelpkey;
    let {venueName, street, usState, usCity}  = this.state
    let url = `https://api.yelp.com/v3/businesses/matches?name=${venueName}&address1=${street}&city=${usCity}&state=${usState}&country=US`
     axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}${url}`,
        {
          headers: {
            Authorization: `Bearer ${key}`
          }
        }
      )
      .then(res => {
        console.log(res)
        let id = res.data.businesses[0].id
        let url = `https://api.yelp.com/v3/businesses/${id}`
        axios
          .get(
            `${"https://cors-anywhere.herokuapp.com/"}${url}`,
            {
              headers: {
                Authorization: `Bearer ${key}`
              }
            }
          )
          .then(res => {
            let singleVenue = {
              name: res.data.name,
              image_url: res.data.image_url,
              rating: res.data.rating,
              url: res.data.url,
              price: res.data.price,
              address: `${res.data.location.display_address[0]} ${res.data.location.display_address[1]}`,
              lat: res.data.coordinates.latitude,
              lon: res.data.coordinates.longitude
            }

            this.setState({
              singleVenue: singleVenue,
              show_map2: true
            })
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error.data)
      })   
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  setVenues = (value) => {
    if (value === 0) {
      this.setState({
        setVenue: '',
        bottom_0: "moreBottom",
        value: value,
        show_map2: false,
        show_map: false,
      })
    } else {
      this.setState({
        bottom_0: "",
        value: value,
        show_map2: false,
        show_map: false,
      })
    }
  }

  setVenue = (obj) => {
    console.log(obj)
    this.props.alert.show(`${obj.name} set as venue`)
    this.setState({
      setVenue: obj
    })
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }

  render() {
    const { classes } = this.props;
    const { selectedDate, value, taco_places, currentPage, tacosPerPage } = this.state;
    const indexOfLastTaco = currentPage * tacosPerPage;
    const indexOfFirstTaco = indexOfLastTaco - tacosPerPage;
    const currentTacos = taco_places.slice(indexOfFirstTaco, indexOfLastTaco);
    const pageNumbers = [];

    console.log(this.state)


    for (let i = 1; i <= Math.ceil(taco_places.length / tacosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
          key={number}
          id={number}
          onClick={this.handleClick}
          className="btnMarginC"
        >
          {number}
        </button>
      );
    });

    function TabContainer(props) {
      return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
          {props.children}
        </Typography>
      );
    }

    return (
      <div className="create-event-full-wrapper pageBottom">
        <div className="navigation-wrapper">
          <DrawerBar />
        </div>

        <div className={`form-wrapper createDiv ${this.state.bottom_0}`}>
          <Paper className={classes.root} elevation={1}>
            <CreateEventWrapper>
              <FlexForm>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid className="formDiv">
                    <div className="taco_budiesDiv">
                      <img src={taco_buddies} className="taco_buddies" />
                      <div className="centered">Create Event</div>
                    </div>
                    <div className="flexDiv">
                      <TextField
                        id="outlined-name"
                        label="Event Name"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        name="name"
                      />
                    </div>
                    <div className="flexDiv">
                      <DatePicker
                        required
                        margin="normal"
                        label="Date picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                      />
                      <TimePicker
                        required
                        margin="normal"
                        label="Time picker"
                        value={selectedDate}
                        onChange={this.handleDateChange}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.checkedInvite}
                            onChange={this.handleSwitchChange("checkedInvite")}
                            value={this.state.checkedInvite}
                          />
                        }
                        label="Invite Friends"
                      />
                    </div>
                    <div className="flexDiv">
                      <Button
                        variant="contained"
                        size="small"
                        className={classes.button}
                        onClick={this.handleSubmit}
                      >

                      <SaveIcon
                        className={classNames(
                          classes.leftIcon,
                          classes.iconSmall
                        )}
                      />
                      Create
                    </Button>
                    </div>
                  </Grid>
                </MuiPickersUtilsProvider>
              </FlexForm>
            </CreateEventWrapper>

            <div className="venueBtns">
              <Button onClick={() => {this.setVenues(0)}}>Remove Venue</Button>
              <Button onClick={() => {this.setVenues(1); this.openModal()}}>Lookup Venue</Button>
              <Button onClick={() => {this.setVenues(2); this.openModal()}}>Search Venues by City</Button>
            </div>

            {this.state.setVenue ? (
              <Typography variant="h5" className="centerText">
                - Venue, {this.state.setVenue.name} -
              </Typography>
            ) : null}

            <section>
      <Modal visible={this.state.visible} className="modal-body" effect="fadeInUp" onClickAway={() => this.closeModal()}>



        {this.state.value === 0 ? (null) 
          : this.state.value === 1 ? (
          <div>
            <div className="containSingle">
            <p className="xbutton" onClick={() => {this.closeModal()}}>X</p>
              <Typography variant="h5" className={`${classes.bottom} centerText`}>
                Look Up Specific Venue
              </Typography>

              <TextField
                id="outlined-name"
                label="Venue Name"
                className={classes.textField}
                value={this.state.byName}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                name="venueName"
              />

              <TextField
                id="outlined-name"
                label="City"
                className={classes.textField}
                value={this.state.usCity}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                name="usCity"
              />

              <TextField
                id="outlined-name"
                label="street"
                className={classes.textField}
                value={this.state.street}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                name="street"
              />

              <SelectUSState onChange={this.setNewValue} className="bottom_marg"/><br />
              <div className="bottom_marg">
                <Button variant="contained" onClick={this.searchSingle}>
                  Search
                </Button>
              </div>
            </div>

            <div>
              {this.state.show_map2 ? (
                <div className="mapSingle">
                  <MapDiv2>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: firebase.functions().app_.options_.googlekey }}
                      defaultZoom={16}
                      defaultCenter={{lat: this.state.singleVenue.lat, lng: this.state.singleVenue.lon}}
                    >
                    <TacoLocation
                      text={this.state.singleVenue.name}
                      lat={this.state.singleVenue.lat}
                      lng={this.state.singleVenue.lon}
                    />
                    </GoogleMapReact>
                  </MapDiv2>

                  <Card>
                    <a href={this.state.singleVenue.url} target="_blank" className={classes.noHref}>
                      <CardActionArea>
                        <CardMedia
                          className={`${classes.media}`}
                          image={this.state.singleVenue.image_url}
                          title="venue picture"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {this.state.singleVenue.name}
                          </Typography>
                          <Typography component="p">
                            Location: {this.state.singleVenue.address}<br/>
                            Rating: {this.state.singleVenue.rating}<br/>
                            Price: {this.state.singleVenue.price}<br/>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </a>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => {this.setVenue(this.state.singleVenue); this.closeModal()}}>
                          Set as Location
                        </Button>
                    </CardActions>
                  </Card>
                </div>

              ) : null }
            </div>
          </div>

            )
          : this.state.value === 2 ? (

          <Paper className={`${classes.root2} paperVenues`} elevation={1}>
            <div className="mapMany">
              <Typography variant="h5" className={`${classes.bottom} centerText`}>
                  Lookup Top Venues
              </Typography>

              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-name"
                  label="by City"
                  className={classes.textField}
                  value={this.state.byCity}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  name="byCity"
                />
              </form>
              <div className="bottom_marg">
                <Button variant="contained" onClick={this.searchMap}>
                  Search
                </Button>
              </div>
            </div>

            {this.state.show_map ? (
                <MapDiv>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: firebase.functions().app_.options_.googlekey
                      }}
                      defaultZoom={this.state.zoom}
                      defaultCenter={{ lat: this.state.lat_av, lng: this.state.lon_av }}
                    >
                      {this.state.destinations.map((d, i) => {
                        return <TacoLocation lat={d.lat} lng={d.lon} text={d.name} key={i} />;
                      })}
                    </GoogleMapReact>
                </MapDiv>
              ) : null}

              <div className="flex1">
                {currentTacos.map((t, idx) => {
                  return (

              <Card className="card">
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={t.image_url}
                    title="venue picture"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {t.name}
                    </Typography>
                    <Typography component="p">
                      Location:{" "}
                      {`${t.location.display_address[0]} ${
                        t.location.display_address[1]
                      }`}<br/>
                      Rating: {t.rating}<br/>
                      Price: {t.price}<br/>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a href={t.url} className="noUnderline">View on Yelp</a>
                    </Button>
                    <Button size="small" color="primary" 
                      onClick={() => {this.setVenue(
                        {
                          lat: t.coordinates.latitude,
                          lon: t.coordinates.longitude,
                          venue: t.name,
                          img_url: t.image_url,
                          location: `${t.location.display_address[0]} ${
                            t.location.display_address[1]
                          }`,
                          raiting: t.rating,
                          price: t.price,
                          url: t.url
                        }
                      )}}
                    >
                      Set as Location
                    </Button>
                </CardActions>
              </Card>
              )
            })}
            </div>
            {renderPageNumbers}
          </Paper>

          )
          : null
        }











                </Modal>
            </section>

          </Paper>
        </div>


        
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, {createEvent})(withStyles(styles)(withAlert()(CreateEvent)));

