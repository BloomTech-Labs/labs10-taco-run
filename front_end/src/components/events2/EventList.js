import React from "react";
import axios from "axios";
import Nav from "../nav/Nav.js";
import {
  Card,
  FlexDiv,
  ViewEvent,
  DispayComments,
  CreateLink,
  ContainLink
} from "./eventlist_css.js";
import { Link } from "react-router-dom";
import {
  getEvents,
  deleteEvent,
  updateEvent
} from "../../store/actions/eventsActions";
import { connect } from "react-redux";
import "./create_event.css";
import DrawerBar from "../drawer/Drawer";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
//-------------Material UI------------------
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap"
  }
});

//------------------------------------------

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      editName: "",
      editDate: "",
      windowWidth: "",
      // For tabs
      tabValue: 0
    };
  }

  // For tabs
  handleChangeTabs = (event, tabValue) => {
    this.setState({ tabValue });
  };

  componentDidMount() {
    this.props.getEvents(parseInt(localStorage.getItem("user_id")));
    console.log(window.innerWidth);
    window.addEventListener("resize", this.checkWindowWidth);
    /* 
			- This is to check if the window is getting resized or not (kind of like a media query) 
			and then invoking my checkWindowWidth function to adjust the this.state.windowWidth value

			- The this.state.windowWidth value is getting rendered as either "50%" or "100%" in my inline styling for the 
			`<GridListTile />` where I adjust width
		*/
  }

  delete = event => {
    this.props.deleteEvent(event.target.id);
  };

  showForm = () => {
    this.setState({
      showEdit: !this.state.showEdit
    });
  };

  update = event => {
    event.preventDefault();
    let obj = {
      name: this.state.editName,
      date: this.state.editDate,
      id: parseInt(event.target.id)
    };
    console.log(obj);
    this.props.updateEvent(obj);
    this.setState({
      showEdit: false
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkWindowWidth = event => {
    // --> window.innerWidth is the size of the width of the whole browser || so with that I can setState to adjust the windwoWidth value from state
    event.preventDefault();
    if (window.innerWidth > 1000) {
      this.setState({ windowWidth: "50%" });
      console.log(this.state.windowWidth);
    } else {
      this.setState({ windowWidth: "100%" });
      console.log(this.state.windowWidth);
    }
  };

  render() {
    // For tabs
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div>
        <DrawerBar />

        <div>
          <div>
            {this.props.events ? (
              <div className={classes.root}>
                <AppBar position="static">
                  <Tabs value={tabValue} onChange={this.handleChangeTabs}>
                    <Tab label="Upcoming" />
                    <Tab label="Pending" />
                    <Tab label="Past" />
                  </Tabs>
                </AppBar>
                {tabValue === 0 && (
                  <TabContainer>
                    <GridList
                      cellHeight={180}
                      className="grid-list"
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        paddingLeft: 55
                      }}
                    >
                      {" "}
                      {/* This gets rid of the small horizontal scrollbar */}
                      <GridListTile
                        cols={2}
                        style={{ height: "auto", textAlign: "center" }}
                      >
                        {" "}
                        {/* This is so the "events list" text doesn't have an absurd height and to center the text */}
                        <ListSubheader component="div">
                          Lets Sign Up For An Event!
                        </ListSubheader>
                      </GridListTile>
                      {this.props.events.upcoming &&
                        this.props.events.upcoming.map(event => {
                          return (
                            // <FlexDiv key={event.id}>
                            // 	<Card id={event.id}>
                            <GridListTile
                              key={event.id}
                              style={{ width: this.state.windowWidth }}
                            >
                              {" "}
                              {/* Dynamically render 50% width or 100% width to adjust! */}
                              <img
                                className="yelp-img"
                                src={event.img_url}
                                style={{ width: "100%" }}
                              />
                              <GridListTileBar
                                style={{ height: "auto" }}
                                title={event.name}
                                subtitle={
                                  <div className="shadow-box">
                                    <span>by: {event.author}</span>
                                    <p
                                      style={{ color: "white" }}
                                      className="comments-number"
                                    >
                                      comments: {event.total_comments}
                                    </p>
                                    {this.props.auth.email ===
                                    event.posters_email ? (
                                      <div>
                                        <DeleteIcon
                                          id={event.id}
                                          style={{ color: "white" }}
                                          onClick={this.delete}
                                        />
                                        <div
                                          id={event.id}
                                          onClick={this.showForm}
                                        >
                                          EDIT
                                        </div>
                                        {this.state.showEdit ? (
                                          <form>
                                            <input
                                              type="text"
                                              placeholder="New Event Name"
                                              onChange={this.handleChange}
                                              name="editName"
                                              value={this.state.editName}
                                            />
                                            <input
                                              type="date"
                                              placeholder="New Event Date"
                                              onChange={this.handleChange}
                                              name="editDate"
                                              value={this.state.editDate}
                                            />
                                            <button
                                              id={event.id}
                                              onClick={this.update}
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        ) : null}
                                      </div>
                                    ) : null}
                                  </div>
                                }
                                actionIcon={
                                  <IconButton>
                                    <Link to={`/events/${event.id}`}>
                                      <InfoIcon style={{ color: "white" }} />
                                    </Link>
                                  </IconButton>
                                }
                              />
                            </GridListTile>
                          );
                        })}
                    </GridList>
                  </TabContainer>
                )}
                {tabValue === 1 && (
                  <TabContainer>
                    <GridList
                      cellHeight={180}
                      className="grid-list"
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        paddingLeft: 55
                      }}
                    >
                      {" "}
                      {/* This gets rid of the small horizontal scrollbar */}
                      <GridListTile
                        cols={2}
                        style={{ height: "auto", textAlign: "center" }}
                      >
                        {" "}
                        {/* This is so the "events list" text doesn't have an absurd height and to center the text */}
                        <ListSubheader component="div">
                          Lets Sign Up For An Event!
                        </ListSubheader>
                      </GridListTile>
                      {this.props.events.pending > 0 &&
                        this.props.events.pending.map(event => {
                          return (
                            // <FlexDiv key={event.id}>
                            // 	<Card id={event.id}>
                            <GridListTile
                              key={event.id}
                              style={{ width: this.state.windowWidth }}
                            >
                              {" "}
                              {/* Dynamically render 50% width or 100% width to adjust! */}
                              <img
                                className="yelp-img"
                                src={event.img_url}
                                style={{ width: "100%" }}
                              />
                              <GridListTileBar
                                style={{ height: "auto" }}
                                title={event.name}
                                subtitle={
                                  <div className="shadow-box">
                                    <span>by: {event.author}</span>
                                    <p
                                      style={{ color: "white" }}
                                      className="comments-number"
                                    >
                                      comments: {event.total_comments}
                                    </p>
                                    {this.props.auth.email ===
                                    event.posters_email ? (
                                      <div>
                                        <DeleteIcon
                                          id={event.id}
                                          style={{ color: "white" }}
                                          onClick={this.delete}
                                        />
                                        <div
                                          id={event.id}
                                          onClick={this.showForm}
                                        >
                                          EDIT
                                        </div>
                                        {this.state.showEdit ? (
                                          <form>
                                            <input
                                              type="text"
                                              placeholder="New Event Name"
                                              onChange={this.handleChange}
                                              name="editName"
                                              value={this.state.editName}
                                            />
                                            <input
                                              type="date"
                                              placeholder="New Event Date"
                                              onChange={this.handleChange}
                                              name="editDate"
                                              value={this.state.editDate}
                                            />
                                            <button
                                              id={event.id}
                                              onClick={this.update}
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        ) : null}
                                      </div>
                                    ) : null}
                                  </div>
                                }
                                actionIcon={
                                  <IconButton>
                                    <Link to={`/events/${event.id}`}>
                                      <InfoIcon style={{ color: "white" }} />
                                    </Link>
                                  </IconButton>
                                }
                              />
                            </GridListTile>
                          );
                        })}
                    </GridList>
                  </TabContainer>
                )}
                {tabValue === 2 && (
                  <TabContainer>
                    <GridList
                      cellHeight={180}
                      className="grid-list"
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        paddingLeft: 55
                      }}
                    >
                      {" "}
                      {/* This gets rid of the small horizontal scrollbar */}
                      <GridListTile
                        cols={2}
                        style={{ height: "auto", textAlign: "center" }}
                      >
                        {" "}
                        {/* This is so the "events list" text doesn't have an absurd height and to center the text */}
                        <ListSubheader component="div">
                          Lets Sign Up For An Event!
                        </ListSubheader>
                      </GridListTile>
                      {this.props.events.past &&
                        this.props.events.past.map(event => {
                          return (
                            // <FlexDiv key={event.id}>
                            // 	<Card id={event.id}>
                            <GridListTile
                              key={event.id}
                              style={{ width: this.state.windowWidth }}
                            >
                              {" "}
                              {/* Dynamically render 50% width or 100% width to adjust! */}
                              <img
                                className="yelp-img"
                                src={event.img_url}
                                style={{ width: "100%" }}
                              />
                              <GridListTileBar
                                style={{ height: "auto" }}
                                title={event.name}
                                subtitle={
                                  <div className="shadow-box">
                                    <span>by: {event.author}</span>
                                    <p
                                      style={{ color: "white" }}
                                      className="comments-number"
                                    >
                                      comments: {event.total_comments}
                                    </p>
                                    {this.props.auth.email ===
                                    event.posters_email ? (
                                      <div>
                                        <DeleteIcon
                                          id={event.id}
                                          style={{ color: "white" }}
                                          onClick={this.delete}
                                        />
                                        <div
                                          id={event.id}
                                          onClick={this.showForm}
                                        >
                                          EDIT
                                        </div>
                                        {this.state.showEdit ? (
                                          <form>
                                            <input
                                              type="text"
                                              placeholder="New Event Name"
                                              onChange={this.handleChange}
                                              name="editName"
                                              value={this.state.editName}
                                            />
                                            <input
                                              type="date"
                                              placeholder="New Event Date"
                                              onChange={this.handleChange}
                                              name="editDate"
                                              value={this.state.editDate}
                                            />
                                            <button
                                              id={event.id}
                                              onClick={this.update}
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        ) : null}
                                      </div>
                                    ) : null}
                                  </div>
                                }
                                actionIcon={
                                  <IconButton>
                                    <Link to={`/events/${event.id}`}>
                                      <InfoIcon style={{ color: "white" }} />
                                    </Link>
                                  </IconButton>
                                }
                              />
                            </GridListTile>
                          );
                        })}
                    </GridList>
                  </TabContainer>
                )}
              </div>
            ) : (
              <div>Loading ...</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    events: state.eventsReducer.events
  };
};

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, updateEvent }
)(withStyles(styles, { withTheme: true })(EventList));
