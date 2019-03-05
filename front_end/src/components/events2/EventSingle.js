import React from "react";
import axios from "axios";
import firebase from 'firebase';
import { connect } from "react-redux";
import { getEvent, updateEvent } from "../../store/actions/eventsActions";
import {
  getComments,
  makeComment,
  deleteComment,
  updateComment
} from "../../store/actions/commentsActions";
// import {
//   Comment,
//   FormComment,
//   CommentSubmit,
//   DeleteBtn,
//   FlexDiv
// } from "./eventsingle_css.js";

// import { Container } from "./eventsingle_css.js";
import { fetchUser } from "../../store/actions/userActions";
import Popup from "reactjs-popup";
import "./create_event.css"
import GoogleMapReact from 'google-map-react';
// import SearchBox from 'react-google-maps'

import { MapDiv } from "./create_event_css.js";
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
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";


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
    backgroundColor: "lightgreen",
    width: "60%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },  
});

const TacoLocation = ({ text }) => <div>{text}</div>;

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
    modalOpened: false,

    checkedInvite: false,
    selectedDate: new Date(),
    location: ''
  };

  fileSelect = (event) => {
    // console.log(event.target.files[0]);
    this.setState({
      picture: event.target.files[0]
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
    this.info()
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEdit = event => {
    this.setState({ editComment: event.target.value });
  };

  info = () => {
    axios.get(`https://production-taco.herokuapp.com/events/${this.props.match.params.id}`)
    .then(res => {
      console.log(res)
      this.setState({        
        date: res.data.date,        
        posted_by: res.data.users[0].name,        
        attending: res.data.users,
        loaded: true,
        checkedInvite: res.data.invite_only,
        selectedDate: res.data.date
      });
    })
  }

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
      this.info()
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
      this.info()
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

  commentDelete = event => {
    event.preventDefault();
    let ids = {
      comment_id: parseInt(event.target.id),
      event_id: parseInt(this.props.match.params.id)
    };
    let obj = { data: ids };
    let cid = obj.data.comment_id;
    this.props.deleteComment(obj, cid);
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

  render() {       
    const { classes } = this.props;
    return (
      <div>
      <DrawerBar />

      {this.state.posted_by === this.props.auth.displayName ? (     
        <div className = "title-event-wrapper" style = {{ paddingLeft: 150, display: "flex", width: "100%", height: 50, justifyContent: "space-evenly", alignItems: "center" }}>
          <h1>You are the author of this event</h1>          
          <Popup trigger = {<Button variant="contained" color="primary" className= "save-button">Update</Button>} modal>
            {close => (
              <div className = "modal-open">
                <a className = "close-modal" onClick = {close}>&times;</a> {/* Close Button "X" */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    container
                    className={classes.grid}
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
                      name = "location" // --> needs a name attribute so it'll load correctly
                      label="Location Name"
                      className={classes.textField}
                      value={this.state.location}
                      onChange={this.handleChange}
                      type = "text"
                      margin="normal"
                  />  

                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
            )}
          </Popup>
        </div>

      ) : (
        <h1>You are not the author of this event</h1>
      )
      }

        {/* {this.state.loaded ? (
          <div className = "state-loaded-wrapper">
            <div className = "event-title-wrapper" style = {{ width: "100%", paddingLeft: 126 }}>
              <h3>Event Title Here</h3>
            </div>
            {/* <div className = "map-div-wrapper">
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
            </div> */}
          { /* </div>
          ) : null} */}

        {/* <Container>

          <div>
            <button onClick={this.leaveEvent}>Click here to leave event</button><br/>
            <button onClick={this.attendEvent}>Click here to Attend</button><br/>
            <button onClick={this.addFav}>Add location to favorites</button>
            <p><img className="yelp_img" alt="restaurant-img" src={this.state.img_url}/></p>
            <p>Venue: {this.state.venue}</p>
            <p>Date: {this.state.date}</p>
            <p>Location {this.state.location}</p>
            <p>posted_by: {this.state.posted_by}</p>
            <p>price: {this.state.price}</p>
            <p>raiting: {this.state.raiting}</p>
            <p><a href={this.state.url}>Yelp Link</a></p>
          </div>
          <div>
            <div className="event-invited">
              <h2 className="event-invited-title">Attending</h2>
              {this.state.attending.map(attendee => {
                if (attendee !== undefined) {
                  return (
                    <div key = {attendee.name}>
                      <h4>{attendee.name}</h4>
                    </div>
                  );
                }
                return "map completed";
              })}
            </div> */}
            {/* <div className="event-discussion">
              <h2 className="event-discussion-title">Discussion</h2>
              {this.props.comments.map(comment => {
                if (comment !== undefined) {
                  return (
                    <FlexDiv key = {comment.id}>

                      {this.props.user.email === comment.posters_email ? (
                        <FlexDiv>
                          <DeleteBtn
                            onClick={this.commentDelete}
                            id={comment.id}
                          >
                            X
                          </DeleteBtn>
                          <Popup
                            trigger={<button>Edit Comment</button>}
                            position="right center"
                          >
                            <FormComment onSubmit={this.commentUpdate}>
                              <textarea
                                type="text"
                                placeholder={"Add a comment or upload image"}
                                onChange={this.handleEdit}
                                name="content"
                                value={this.state.editComment}
                              />
                            </FormComment>
                            <CommentSubmit
                              onClick={this.commentUpdate}
                              id={comment.id}
                            >
                              Edit
                            </CommentSubmit>
                          </Popup>
                        </FlexDiv>
                      ) : null }

                      <Comment key={comment.id}>
                        <h4> - {comment.posted_by}</h4>
                        <h6>{comment.date}</h6>
                        <h5>{comment.content}</h5>
                        <img src={comment.pic_url} alt="comment-img" />
                      </Comment>
                    </FlexDiv>
                  );
                }
                return "comments map completed"
              })}
            </div>
          </div>
          <FormComment onSubmit={this.createComment}>
            <textarea
              type="text"
              placeholder="Add a comment or upload image"
              onChange={this.handleChange}
              name="content"
              value={this.state.content}
            /><br />
            <input type="file" onChange={this.fileSelect}></input>
          </FormComment>

          <CommentSubmit onClick={this.createComment}>Submit</CommentSubmit>
        </Container> */}
      </div>
    );
  }
}

// mapStateToProps
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    event: state.eventsReducer.event,
    attendees: state.eventsReducer.attendees,
    comments: state.commentsReducer.comments,
    auth: state.firebase.auth,    
  };
};

export default connect(mapStateToProps,{getEvent,updateEvent,getComments,fetchUser,makeComment,deleteComment,updateComment})(withStyles(styles)(EventSingle));
