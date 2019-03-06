import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/eventsActions";
import "./create_event.css";
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
import { CreateEventWrapper, FlexForm } from "./create_event_css.js";

import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
  }
});

// const TacoLocation = ({ text }) => <div>{text}</div>;

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
      posters_email: ""
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

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    console.log(this.props);
    return (
      <div className="create-event-full-wrapper">
        <div className="navigation-wrapper">
          <DrawerBar />
        </div>

        <div className="form-wrapper">
          <CreateEventWrapper>
            <FlexForm>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-evenly">
                  <TextField
                    required
                    id="standard-name"
                    name="name" // --> needs a name attribute so it'll load correctly
                    label="Event Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                    margin="normal"
                  />

                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Author of the Event"
                    defaultValue={this.props.auth.displayName}
                    // value = {this.state.author}
                    className={classes.textField}
                    margin="normal"
                  />

                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Email Address"
                    defaultValue={this.props.auth.email}
                    // value = {this.state.posters_email}
                    className={classes.textField}
                    margin="normal"
                  />

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
                    label="Invite Only"
                  />
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
