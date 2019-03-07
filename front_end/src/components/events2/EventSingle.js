import React from "react";
import axios from "axios";
import firebase from 'firebase';
import { connect } from "react-redux";
import Moment from "react-moment";
import { getEvent, updateEvent, inviteEvent } from "../../store/actions/eventsActions";
import {
  getComments,
  makeComment,
  deleteComment,
  updateComment,
} from "../../store/actions/commentsActions";

import {
  Comment,
  FormComment,
  CommentSubmit,
  DeleteBtn,
  FlexDiv
} from "./eventsingle_css.js";

import {fetchFriends} from '../../store/actions/friendsActions'
import {searchUsers} from '../../store/actions/userActions'

// import { Container } from "./eventsingle_css.js";
import { fetchUser } from "../../store/actions/userActions";
import Popup from "reactjs-popup";
import "./create_event.css"
import GoogleMapReact from 'google-map-react';
// import SearchBox from 'react-google-maps'

import { MapDiv, YelpDiv } from "./create_event_css.js";
import { withAlert } from 'react-alert';
import DrawerBar from "../drawer/Drawer";

// --> Edit Event Form
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import SearchIcon from '@material-ui/icons/Search';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Image from 'react-image-resizer';
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from '@material-ui/icons/Delete';

import './custom.css'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
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
    backgroundColor: "lightgreen",
    width: "60%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },  
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginT: {
    marginTop: 6
  },
  media: {
    height: 140,
  },
  pstyle: {
    lineHeight: 1.4,
    fontSize: '18px'
  },
  card: {
    maxWidth: 600,
    marginTop: 15
  },
  margRight: {
    marginRight: "1%"
  },
  cardBtn: {
    minWidth: 293
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  cardSmall: {
    minWidth: '300px'
  },
  commentBtn: {
    minWidth: 150,
    margin: "15px 0"
  },
  noTop: {
    marginTop: 0
  },
  comment: {
    maxWidth: 600,
  },
  formComment: {
    maxWidth: 500,
    width: "100%"
  }
});


const image = {
  border: '1px solid #ccc',
  background: '#fefefe',
  marginBottom: 5
}

const TacoLocation = ({ text }) => <div className="taco">{text}</div>;

class EventSingle extends React.Component {
  state = {
    content: "",
    editComment: "",
    venue: '',
    date: '',
    location: '',
    posted_by: '',
    price: '',
    raiting: '',
    url: '',
    img_url: '',
    attending: [],
    loaded: false,
    picture: '',
    pic_url: '',
    show_update: false,
    modalOpened: false,
    show_map: false,
    checkedInvite: false,
    selectedDate: new Date(),
    city_location: "",
    taco_places: [],
    destinations: [],
    zoom: 13,
    lat_av: 0,
    lon_av: 0,
    currentPage: 1,
    tacosPerPage: 6,
    search: "",
    email: ''
  };

  fileSelect = (event) => {
    // console.log(event.target.files[0]);
    this.setState({
      picture: event.target.files[0]
    })
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  postImage = (comment) => {

    let present = firebase.functions().app_.options_.upload_present
    
    const formData = new FormData();

    formData.append('file', this.state.picture)
    formData.append('upload_preset', present)

    axios({
      url: "https://api.cloudinary.com/v1_1/hhxek2qo9/upload",
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    })
    .then(res => {
      this.setState({
        pic_url: res.data.secure_url
      })
      console.log(res)
    })
    .then(() => {
      comment.pic_url = this.state.pic_url
      this.props.makeComment(comment, this.props.match.params.id);
      this.setState({
        content: ""
      });
    })
    .catch(error => {
      console.log(error)
    })
  }


  componentDidMount() {
    this.props.getComments(this.props.match.params.id);
    this.props.fetchUser(localStorage.getItem("user_id"));
    this.props.fetchFriends(localStorage.getItem("user_id"))
    this.getEventInfoSingle()
  }


  getEventInfoSingle = () => {
    axios.get(`https://production-taco.herokuapp.com/events/${this.props.match.params.id}`)
    .then(res => {
      console.log('res on user here \n')
      console.log(res)

      let lat,lon

      if (!res.data.lat || !res.data.lon){
        lat = 0
        lon = 0
      } else {
        lat = parseFloat(res.data.lat)
        lon = parseFloat(res.data.lon)
      }

      this.setState({
        venue: res.data.venue,
        date: res.data.date,
        location: res.data.location,
        posted_by: res.data.posted_by,
        price: res.data.price,
        raiting: res.data.raiting,
        url: res.data.url,
        img_url: res.data.img_url,
        lat: lat,
        lon: lon,
        attending: res.data.users,
        checkedInvite: res.data.invite_only,
        loaded: true,
        email: res.data.email,
      })
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEdit = event => {
    this.setState({ editComment: event.target.value });
  };


  leaveEvent = event => {
    event.preventDefault();
    console.log('connected')
    // let user_id = parseInt(localStorage.getItem("user_id"))
    let obj =  {data: { user_id: parseInt(localStorage.getItem("user_id")), event_id: parseInt(this.props.match.params.id)}}
    console.log(obj)
    axios.delete('https://production-taco.herokuapp.com/users_events', obj)
    .then(res => {
      if (res.data.msg){
        this.props.alert.show(res.data.msg)
      } else {
        this.props.alert.show('You are no long attending event')
      }
      this.getEventInfoSingle()
    })
    .catch(error => {
      console.log(error)
    })
  }

  attendEvent = event => {
    event.preventDefault();
    console.log('connected')
    let obj = { user_id: parseInt(localStorage.getItem("user_id")), event_id: parseInt(this.props.match.params.id)}
    console.log(obj)
    axios.post('https://production-taco.herokuapp.com/users_events', obj)
    .then(res => {
      console.log(res)
      this.getEventInfoSingle()
      if (res.data.msg){
        this.props.alert.show(res.data.msg)
      } else {
        this.props.alert.show('You are now attending event')
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  createComment = event => {
    event.preventDefault();

    let today = new Date().toDateString();
    let comment = {
      content: this.state.content,
      date: today,
      posted_by: this.props.user.name,
      event_id: parseInt(this.props.match.params.id),
      posters_email: this.props.user.email,
      posters_pic: this.props.user.user_pic
    };

    if (this.state.picture){
      this.postImage(comment)
      return
    }

    this.props.makeComment(comment, this.props.match.params.id);

    this.setState({
      content: ""
    });
  };

  commentUpdate = event => {
    event.preventDefault();
    let comment = {
      id: parseInt(event.target.id),
      event_id: parseInt(this.props.match.params.id),
      posted_by: this.props.user.name,
      content: this.state.editComment,
    };
    
    this.props.updateComment(comment);
    this.setState({
      editComment: ""
    });
  };

  commentDelete = comment_id => {
    let ids = {
      comment_id: comment_id,
      event_id: parseInt(this.props.match.params.id)
    };
    let obj = { data: ids };
    this.props.deleteComment(obj, comment_id);
  };  

  addFav = event => {
    event.preventDefault();
    let obj = {name: this.state.venue, location: this.state.location, user_id: parseInt(localStorage.getItem("user_id"))}

    axios.post('https://production-taco.herokuapp.com/favorites', obj)
    .then(res => {
      // console.log(res)
      if (res.data.msg){
        this.props.alert.show(res.data.msg)
      } else {
        this.props.alert.show(`${this.state.venue} added to favorites`)
      }
    })
    .catch(error => {
      console.log(error);
    })
  };

  openModal = () => {
    this.state.modalOpened === false ? (
      this.setState({ modalOpened: true })
    ) : (
      this.setState({ modalOpened: false })
    )
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleChange = event => {    
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSwitchChange = name => event => {
    this.setState({ [name]: event.target.checked });
    console.log(`${[name]}: ${event.target.checked}`);
  };

  switchForm = () => {
    this.setState({
      show_update: !this.state.show_update,
    }, () => {this.getEventInfoSingle()})
  }

  searchMap = event => {

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
  };

  addVenue = (obj) => {
    this.props.updateEvent(obj, this.props.match.params.id)
    this.setState({
      loaded: false
    })
  }

  handleSearchChange = e => {
    this.setState({ search: [e.target.value] });    
  };

  handleSubmitUsers = e => {
    e.preventDefault();
    this.props.searchUsers(this.state.search);
    this.setState({ search: "" });    
    let box = document.getElementById("results");
    box.style.display = "inline-block";    
  };

  handleInvite = e => {
    e.preventDefault();
    let inviteObject = { // --> we need to create the expected invite object before we send it
      user_id: this.props.users[0].id,
      event_id: this.props.match.params.id
    };
    this.props.inviteEvent(inviteObject);
  };

  render() {       
    const { classes } = this.props;
    console.log(this.state)
    console.log(this.props)

    const bull = <span className={classes.bullet}>•</span>;

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
          className="btnMargin"
        >
          {number}
        </button>
      );
    });

    return (
      <div>
        <DrawerBar />
        <div className="container">

          {this.state.posted_by === this.props.auth.displayName ? (
            <div className="container">
              <Button variant="contained" color="primary" onClick={this.switchForm}>
                Invite/Venue
              </Button>
            </div>

            ) : null}

            {this.state.show_update ? (



            <div className="container">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  container
                  className={`${classes.grid} formTop`}
                  justify="space-evenly"
                >
                
                  <DatePicker
                    required
                    margin="normal"
                    label="Date picker"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                  />

                  <TimePicker
                    required
                    margin="normal"
                    label="Time picker"
                    value={this.state.selectedDate}
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
               
                  

                  <TextField                      
                    id="standard-name"
                    name = "city_location" // --> needs a name attribute so it'll load correctly
                    label="Search taco places by city"
                    className={classes.textField}
                    value={this.state.city_location}
                    onChange={this.handleChange}
                    type = "text"
                    margin="normal"
                  /> 

                  <Button 
                    variant="contained" 
                    className={classes.marginT}
                    onClick={() => {this.searchMap(this.state.city_location)}}
                  >
                    Search
                  </Button>
                </Grid>

                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    {/* <SearchIcon onSubmit = {this.handleSubmitUsers}/> */}
                  </div>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleSubmitUsers}
                  >
                    <TextField
                      id="standard-search"
                      label="Invite More People"
                      type="search"
                      className={classes.textField}
                      margin="normal"
                      value={this.state.search}
                      onChange={this.handleSearchChange}
                    />
                  </form> 
                  <div id="results" ref={node => (this.node = node)}>
                    <List>
                      {this.props.users.map(result => {
                        if (result !== undefined) {
                          return (
                            <Link key = {result.name} to={`user/${result.id}`}>
                              <ListItem className="resultsDisplay">
                                <ListItemAvatar className="location-picture">
                                  <Avatar src={result.user_pic} />
                                </ListItemAvatar>
                                <ListItemText primary={result.name} />
                                <IconButton aria-label="Add">
                                <Icon onClick={this.handleInvite} id={result.id}>
                                  +
                                </Icon>
                              </IconButton>                                    
                              </ListItem>
                              <Divider />
                            </Link>
                          );
                        }
                      })}
                    </List>
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
                      Add Location
                    </Button>
                </CardActions>
              </Card>

                  )
                })}
              </div>
              </MuiPickersUtilsProvider>
              {renderPageNumbers}
            </div>


            ) :

        <div>
          {this.state.loaded && (this.state.lat !== 0 || this.state.lon !== 0) ? (
            <div className = "state-loaded-wrapper">
               <div className = "map-div-wrapper">
                <MapDiv>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: firebase.functions().app_.options_.googlekey }}
                    defaultZoom={16}
                    defaultCenter={{lat: this.state.lat, lng: this.state.lon}}
                  >
                  <TacoLocation
                    text={this.state.venue}
                    lat={this.state.lat}
                    lng={this.state.lon}
                  />
                  </GoogleMapReact>
                </MapDiv>
              </div> 
            </div>
            ) : null} 
            <div className="container">
              <div className="flexCardBtn">
                <div className="joinBtnDiv">
                  <Button variant="contained" color="primary" onClick={this.leaveEvent} className={classes.cardBtn}>
                    Add location to favorites
                  </Button>
                </div>
                <div className="topMarg">
                  <Button variant="contained" color="secondary" onClick={this.leaveEvent} className={classes.cardBtn}>
                    Leave Event
                  </Button>
                </div>
              </div>

              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={this.state.img_url}
                    title="venue picture"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.state.venue}
                    </Typography>
                    <Typography component="p" className={classes.pstyle}>
                      <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">
                        {this.state.date}
                      </Moment><br/>
                      Location {this.state.location}<br/>
                      posted by: {this.state.posted_by}<br />
                      price: {this.state.price}<br />
                      raiting: {this.state.raiting}<br />
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" >
                    <a href={this.state.url} className="noUnderline">Yelp Link</a>
                  </Button>
                </CardActions>
              </Card>
            </div>

            <h2 className="event-invited-title attendingh2">Attending</h2>
            <div className="event-invited container attendeesDiv">
              
              {this.state.attending.map(attendee => {
                if (attendee !== undefined) {
                  return (
                    <Card className={classes.cardSmall} key={attendee.id}>
                      <CardContent>
                        <Avatar alt="Remy Sharp" src={attendee.user_pic} className={classes.bigAvatar} />
                        <Typography variant="h5" component="h2">
                        {attendee.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => {this.props.history.push(`/user/${attendee.id}`)}}>View Profile</Button>
                      </CardActions>
                    </Card>
                  );
                }
                return "map completed";
              })}
            </div>

            <h2 className="event-discussion-title attendingh2">Discussion</h2>
            <div className="event-discussion container">
              
              {this.props.comments.map(comment => {
                if (comment !== undefined) {
                  return (
                    <FlexDiv key = {comment.id} >
                      <Card className={`${classes.card} ${classes.noTop}`}>
                        <CardContent>
                          <Typography component="p">
                            posted on - {comment.date}
                          </Typography>
                          <Typography variant="h5" component="h2">
                          {comment.posted_by}
                          </Typography>
                          <Avatar alt="Remy Sharp" src={comment.posters_pic}className={classes.bigAvatar} />
                          <Typography component="p" className={classes.pstyle}>
                            {comment.content}
                          </Typography>
                          <Image
                            src={comment.pic_url}
                            width={220}
                            height={220}
                            style={image}
                          />
                        </CardContent>
                      </Card>

                        {this.props.user.email === comment.posters_email ? (
                          <div className="flexCommentBtn">
                            <div className="deleteCommentBtn">
                              <Button 
                                variant="contained" 
                                color="secondary"
                                onClick={() => {this.commentDelete(comment.id)}}
                                className={classes.commentBtn}
                               >
                                Delete
                              <DeleteIcon className={classes.rightIcon} />
                              </Button>
                            </div>
                            <Popup
                              trigger={<div ><Button variant="contained" color="primary" className={classes.commentBtn}>Edit Comment</Button></div>}
                              position="top center"
                            >
                            <div className="popupDiv">
                              <form onSubmit={this.commentUpdate}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Edit Comment"
                                  multiline
                                  rows="8"
                                  onChange={this.handleEdit}
                                  margin="normal"
                                  variant="outlined"
                                  type="text"
                                  placeholder={"edit your comment here"}
                                  value={this.state.editComment}
                                  name="content"
                                />
                              </form>
                              <p className="formSubmit" onClick={this.commentUpdate} id={comment.id}>Submit</p>
                            </div>
                            </Popup>


                          </div>
                        ) : null }

                    </FlexDiv>
                  );
                }
                return "comments map completed"
              })}
            </div>
            <div className="container pageBottom">
              <Paper className={`${classes.root} ${classes.comment}`} elevation={1}>
                <Typography variant="h5" component="h3">
                  Post a Comment
                </Typography>
                <form onSubmit={this.commentUpdate}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Add Comment"
                    multiline
                    rows="8"
                    margin="normal"
                    variant="outlined"
                    type="text"
                    placeholder="Add a comment and or upload image"
                    onChange={this.handleChange}
                    name="content"
                    value={this.state.content}
                    className={classes.formComment}
                  />
                </form>
                <input type="file" className="spacing" onChange={this.fileSelect}></input><br/>
                <Button variant="contained" color="primary" onClick={this.createComment}>Submit Comment</Button>
              </Paper>

            </div>
          </div>
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    event: state.eventsReducer.event,
    attendees: state.eventsReducer.attendees,
    comments: state.commentsReducer.comments,
    auth: state.firebase.auth,  
    friends: state.friendsReducer.friends,
    users: state.userReducer.users 
  };
};

export default connect(mapStateToProps,{getEvent,updateEvent,getComments,fetchUser,makeComment,deleteComment,updateComment, fetchFriends, searchUsers, inviteEvent})(withStyles(styles)(EventSingle));