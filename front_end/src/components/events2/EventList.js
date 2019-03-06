import React from "react";
import { Link } from "react-router-dom";
import {
  getEvents,
  deleteEvent,
  updateEvent,
  acceptEvent,
  declineEvent
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
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import "./custom.css";

import Moment from "react-moment";

// Badge Import
import Badge from "@material-ui/core/Badge";

import { ListContainer, UpcomingContainer, FlexList } from "./eventlist_css.js";

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
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  button: {
    margin: theme.spacing.unit,
    height: 40
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  pmarg: {
    marginBottom: 10
  }
});

//root

//------------------------------------------

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: "",
      editDate: "",
      windowWidth: "",
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

    /* 
			- This is to check if the window is getting resized or not (kind of like a media query) 
			and then invoking my checkWindowWidth function to adjust the this.state.windowWidth value

			- The this.state.windowWidth value is getting rendered as either "50%" or "100%" in my inline styling for the 
			`<GridListTile />` where I adjust width
		*/
  }

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

  joinEvent = id => {
    let id_user = Number(localStorage.getItem("user_id"));
    let obj = { user_id: id_user, event_id: id };
    this.props.acceptEvent(obj);
  };

  declineEvent = id => {
    let id_user = Number(localStorage.getItem("user_id"));
    let obj = { user_id: id_user, event_id: id };
    this.props.declineEvent(obj);
  };

  render() {
    // For tabs
    const { classes } = this.props;
    const { tabValue } = this.state;
    console.log(this.props);
    console.log(this.state);
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div className="events-container">
        <DrawerBar />

        <ListContainer>
          {this.props.events ? (
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs value={tabValue} onChange={this.handleChangeTabs}>
                  <Tab label="Upcoming" />
                  <Tab
                    label={
                      <Badge
                        className={classes.padding}
                        color="secondary"
                        badgeContent={this.props.pendingCount}
                      >
                        Pending
                      </Badge>
                    }
                  />
                  <Tab label="Past" />
                </Tabs>
              </AppBar>
              {tabValue === 0 && (
                <TabContainer>
                  <Grid container>
                    {this.props.events.upcoming &&
                      this.props.events.upcoming.map(event => {
                        return (
                          <Grid item xs={12} key={event.id}>
                            <Paper className={`${classes.paper} flexList`}>
                              {this.props.auth.email === event.posters_email ? (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    this.props.deleteEvent(event.id);
                                  }}
                                  color="secondary"
                                  id={event.id}
                                  className={classes.button}
                                >
                                  Delete
                                  <DeleteIcon className={classes.rightIcon} />
                                </Button>
                              ) : null}
                              <Avatar
                                alt="posters image"
                                src={event.posters_pic}
                                className={classes.bigAvatar}
                              />

                              <CardContent>
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  className={classes.pos}
                                >
                                  {event.name}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
                                    {event.date}
                                  </Moment>
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  total attending: {event.total_users}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  comments: {event.total_comments}
                                </Typography>
                                <Typography
                                  component="p"
                                  className={classes.pmarg}
                                >
                                  posted by {event.author}
                                </Typography>
                              </CardContent>
                              <Button
                                className={classes.button}
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={() => {
                                  this.props.history.push(
                                    `/events/${event.id}`
                                  );
                                }}
                              >
                                View Event
                              </Button>
                            </Paper>
                          </Grid>
                        );
                      })}
                  </Grid>
                </TabContainer>
              )}
              {tabValue === 1 && (
                <TabContainer>
                  <Grid container>
                    {this.props.events.pending &&
                      this.props.events.pending.map(event => {
                        return (
                          <Grid item xs={12} key={event.id}>
                            <Paper className={`${classes.paper} flexList`}>
                              {this.props.auth.email === event.posters_email ? (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    this.props.deleteEvent(event.id);
                                  }}
                                  color="secondary"
                                  id={event.id}
                                  className={classes.button}
                                >
                                  Delete
                                  <DeleteIcon className={classes.rightIcon} />
                                </Button>
                              ) : null}

                              <Card className={`${classes.card} spacingCard`}>
                                <CardContent>
                                  <Typography
                                    variant="h5"
                                    component="h2"
                                    className={classes.pos}
                                  >
                                    {event.name}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    className={classes.pmarg}
                                  >
                                    <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
                                      {event.date}
                                    </Moment>
                                  </Typography>
                                  <Typography
                                    component="p"
                                    className={classes.pmarg}
                                  >
                                    total attending: {event.total_users}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    className={classes.pmarg}
                                  >
                                    comments: {event.total_comments}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    className={classes.pmarg}
                                  >
                                    posted by {event.author}
                                  </Typography>
                                  <Avatar
                                    alt="posters image"
                                    src={event.posters_pic}
                                    className={classes.bigAvatar}
                                  />
                                </CardContent>
                              </Card>
                              <Button
                                className={classes.button}
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={() => {
                                  this.props.history.push(
                                    `/events/${event.id}`
                                  );
                                }}
                              >
                                View Event
                              </Button>
                              <Button
                                className={classes.button}
                                id={event.id}
                                onClick={() => {
                                  this.joinEvent(event.id);
                                }}
                              >
                                LETS GO
                              </Button>
                              <Button
                                className={classes.button}
                                id={event.id}
                                onClick={() => {
                                  this.declineEvent(event.id);
                                }}
                              >
                                NOT THIS TIME
                              </Button>
                            </Paper>
                          </Grid>
                        );
                      })}
                  </Grid>
                </TabContainer>
              )}
              {tabValue === 2 && (
                <TabContainer>
                  <Grid container>
                    {this.props.events.past &&
                      this.props.events.past.map(event => {
                        return (
                          <Grid item xs={12} key={event.id}>
                            <Paper className={`${classes.paper} flexList`}>
                              {this.props.auth.email === event.posters_email ? (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    this.props.deleteEvent(event.id);
                                  }}
                                  color="secondary"
                                  id={event.id}
                                  className={classes.button}
                                >
                                  Delete
                                  <DeleteIcon className={classes.rightIcon} />
                                </Button>
                              ) : null}

                              <Card className={`${classes.card} spacingCard`}>
                                <CardContent>
                                  <Typography
                                    variant="h5"
                                    component="h2"
                                    className={classes.pos}
                                  >
                                    {event.name}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    className={classes.pmarg}
                                  >
                                    <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
                                      {event.date}
                                    </Moment>
                                  </Typography>
                                  <Typography
                                    component="p"
                                    className={classes.pmarg}
                                  >
                                    total attending: {event.total_users}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    className={classes.pmarg}
                                  >
                                    comments: {event.total_comments}
                                  </Typography>
                                  <Typography
                                    component="p"
                                    className={classes.pmarg}
                                  >
                                    posted by {event.author}
                                  </Typography>
                                  <Avatar
                                    alt="posters image"
                                    src={event.posters_pic}
                                    className={classes.bigAvatar}
                                  />
                                </CardContent>
                              </Card>
                              <Button
                                className={classes.button}
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={() => {
                                  this.props.history.push(
                                    `/events/${event.id}`
                                  );
                                }}
                              >
                                View Event
                              </Button>
                            </Paper>
                          </Grid>
                        );
                      })}
                  </Grid>
                </TabContainer>
              )}
            </div>
          ) : (
            <div>Loading ...</div>
          )}
        </ListContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    events: state.eventsReducer.events,
    pendingCount: state.eventsReducer.pendingCount
  };
};

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, updateEvent, acceptEvent, declineEvent }
)(withStyles(styles, { withTheme: true })(EventList));
