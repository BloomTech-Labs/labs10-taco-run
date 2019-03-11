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
import { MapDiv, YelpDiv } from "./create_event_css.js";

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
    backgroundColor: "lightgreen",
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
  root2: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '700px',
    width: '100%',
    margin: '0 auto',
    marginTop: '20px'
  },
  bottom: {
    marginBottom: 0
  },
  media: {
    height: 140,
  },
});

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
      city_location: "",
      taco_places: [],
      destinations: [],
      zoom: 13,
      lat_av: 0,
      lon_av: 0,
      currentPage: 1,
      tacosPerPage: 6,
      byCity: "",
      byName: "",
      venue: ""
    };
  }
  componentDidMount() {
    console.log(`checkedInvite is: ${this.state.checkedInvite}`);
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
    /*
      - "name": "another really fun event!",
	    - "date": "2019-03-01T03:09:15.212Z",
	    - "author": "Marshall Lanners",
	    - "user_id": 1,
	    - "posters_email": "lanners.marshall@yahoo.com",
	    - "invite_only": true
    */
    console.log("event_obj is: \n");
    console.log(event_obj);
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
        //this.props.alert.show("invalid city");
        console.log(error);
        this.setState({
          city_location: ""
        });
      });
    })
  };

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  addVenue = (venue) => {
    this.setState({
      venue: venue
    })
  }




  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    console.log(this.props);
    console.log(this.state)

    const {taco_places, currentPage, tacosPerPage} = this.state
    const indexOfLastTaco = currentPage * tacosPerPage;
    const indexOfFirstTaco = indexOfLastTaco - tacosPerPage;
    const currentTacos = taco_places.slice(indexOfFirstTaco, indexOfLastTaco);
    const pageNumbers = [];

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

    return (
      <div className="create-event-full-wrapper bottomPadding">
        <div className="navigation-wrapper">
          <DrawerBar />
        </div>

        <div className="form-wrapper createDiv ">
          <Paper className={classes.root} elevation={1}>
            <CreateEventWrapper>
              <FlexForm>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid className="formDiv">

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
          </Paper>
        </div>

        <Paper className={`${classes.root2} paperVenues`} elevation={1}>

            <Typography variant="h5" className={`${classes.bottom} centerText`}>
                Lookup Venue
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
              <TextField
                id="outlined-name"
                label="by Venue Name"
                className={classes.textField}
                value={this.state.byName}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                name="byName"
              />
            </form>
            <Button variant="contained" onClick={this.searchMap}>
              Search
            </Button>

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

              <div class="flex1">
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
                      onClick={() => {this.addVenue(
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
export default connect(
  mapStateToProps,
  { createEvent }
)(withStyles(styles)(CreateEvent));
// export default withStyles(styles)(MaterialUIPickers);
