import React from "react";
import axios from "axios";
import firebase from 'firebase';
import { connect } from "react-redux";
import { getEvent, updateEvent } from "../../store/actions/eventsActions";
import {
  getComments,
  makeComment,
  deleteComment,
  updateComment,
} from "../../store/actions/commentsActions";
// import {
//   Comment,
//   FormComment,
//   CommentSubmit,
//   DeleteBtn,
//   FlexDiv
// } from "./eventsingle_css.js";

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
import './custom.css'


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
    tacosPerPage: 5,
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
    this.info()
    this.props.fetchFriends(localStorage.getItem("user_id"))
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

  switchForm = () => {
    this.setState({
      show_update: !this.state.show_update,
    })
  }

  searchMap = event => {
    //event.preventDefault();
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

  render() {       
    const { classes } = this.props;
    console.log(this.state)
    console.log(this.props)


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
        >
          {number}
        </button>
      );
    });

    return (
      <div>
        <DrawerBar />
        <div class="container">
          {this.state.posted_by === this.props.auth.displayName ? (
            <div>
              <Button variant="contained" color="primary" >
                Primary
              </Button>

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

                {this.state.show_map ? (
                  <MapDiv>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: firebase.functions().app_.options_.googlekey
                      }}
                      defaultZoom={this.state.zoom}
                      defaultCenter={{ lat: this.state.lat_av, lng: this.state.lon_av }}
                    >
                      {this.state.destinations.map(d => {
                        return <TacoLocation lat={d.lat} lng={d.lon} text={d.number} />;
                      })}
                    </GoogleMapReact>
                  </MapDiv>
                ) : null}


              <div>
                {currentTacos.map((t, idx) => {
                  return (
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={t.image_url}
                      title="Contemplative Reptile"
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
                    <Button size="small" color="primary">
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

          ) : null } 
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

export default connect(mapStateToProps,{getEvent,updateEvent,getComments,fetchUser,makeComment,deleteComment,updateComment, fetchFriends, searchUsers})(withStyles(styles)(EventSingle));




            // {this.state.show_map ? (
            //   <MapDiv>
            //     <GoogleMapReact
            //       bootstrapURLKeys={{
            //         key: firebase.functions().app_.options_.googlekey
            //       }}
            //       defaultZoom={this.state.zoom}
            //       defaultCenter={{ lat: this.state.lat_av, lng: this.state.lon_av }}
            //     >
            //       {this.state.destinations.map(d => {
            //         return <TacoLocation lat={d.lat} lng={d.lon} text={d.number} />;
            //       })}
            //     </GoogleMapReact>
            //   </MapDiv>
            // ) : null}

