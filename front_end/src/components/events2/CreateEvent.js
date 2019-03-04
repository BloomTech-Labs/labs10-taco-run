import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/eventsActions";
import axios from "axios";
import "./create_event.css";
import firebase from "firebase";
import DrawerBar from "../drawer/Drawer";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import {
  CreateEventWrapper,  
  FlexForm,
} from "./create_event_css.js";

import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  grid: {
    width: "100%",        
    borderRadius: 10,
    padding: 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "lightsalmon",
    width: "60%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


// const TacoLocation = ({ text }) => <div>{text}</div>;

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedDate: new Date(),
      location: "",
      venue: "",
      author: "",
      user_id: "",
      city_location: "",
      tacos_places: [],
      destinations: [],
      zoom: 11,
      lat_av: 0,
      lon_av: 0,
      show_map: false,
      checkedInvite: true,
      checkedNoInvite: true,
      invite_only: false
    };
  }
  componentDidMount() {}

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked });
    console.log(`${[name]}: ${event.target.checked}`)
    if (this.state.checkedInvite === false) {
      this.setState({ invite_only: false })
      console.log(`invite_only is: ${this.state.invite_only}`);
    } else {
      this.setState({ invite_only: true })
      console.log(`invite_only is: ${this.state.invite_only}`);
    }
  };

  handleChange = event => {
    console.log(`${[event.target.name]}: ${event.target.value}`)
    this.setState({ [event.target.name]: event.target.value });
  };
  searchMap = event => {
    event.preventDefault();
    let key = firebase.functions().app_.options_.yelpkey;
    let city = this.state.city_location;
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
            number: i + 1
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
          tacos_places: res.data.businesses,
          destinations: destinations,
          lat_av: av_lat,
          lon_av: av_lon,
          show_map: true
        });
      })
      .catch(error => {
        this.props.alert.show("invalid city");
        console.log(error);
        this.setState({
          city_location: ""
        });
      });
  };
  handleSubmit = obj => {
    console.log("obj is: \n");
    console.log(obj);
    let event_obj = {        
      name: this.state.name,
      date: this.state.selectedDate,
      posters_email: this.props.auth.email,
      invite_only: this.state.invite_only,
      user_id: parseInt(localStorage.getItem("user_id"), 10),
      author: this.props.auth.displayName
    }
    this.props.createEvent(event_obj);
    this.props.history.push("/events");
  };

  eventsPush = () => {
    this.props.history.push("/events");
  }
  render() {
    const { classes } = this.props;
    console.log(this.props);
    const { selectedDate } = this.state;
    return (
      <div className="create-event-full-wrapper">
        <div className="navigation-wrapper">
          <DrawerBar />
        </div>        

        <div className = "form-wrapper">
          <CreateEventWrapper>              
            <FlexForm>                            
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  container
                  className={classes.grid}
                  justify="space-evenly"
                >
                  <TextField
                    required
                    id="standard-name"
                    name = "name" // --> needs a name attribute so it'll load correctly
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    type = "text"
                    margin="normal"
                  />                  
                  <DatePicker
                    margin="normal"
                    label="Date picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                  <TimePicker
                    margin="normal"
                    label="Time picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedInvite}
                        onChange={this.handleSwitchChange('checkedInvite')}
                        value= {this.state.checkedInvite}
                      />
                    }
                    label="Invite Only"
                  />
                  <Button variant="contained" size="small" className={classes.button} onClick = {this.handleSubmit}>
                    <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                      Create
                  </Button>
                </Grid>
              </MuiPickersUtilsProvider>
            </FlexForm>  
          </CreateEventWrapper>
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
export default connect(
  mapStateToProps,
  { createEvent }
)(withStyles(styles)(CreateEvent));
// export default withStyles(styles)(MaterialUIPickers);