import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getEvent } from "../../store/actions/eventsActions";
import {
  getComments,
  makeComment,
  deleteComment,
  updateComment
} from "../../store/actions/commentsActions";
import {
  Comment,
  FormComment,
  CommentSubmit,
  DeleteBtn,
  FlexDiv
} from "./eventsingle_css.js";

import { Container } from "./eventsingle_css.js";
import Nav from "../nav/Nav.js";
import { fetchUser } from "../../store/actions/userActions";
import Popup from "reactjs-popup";
import "./create_event.css"
import GoogleMapReact from 'google-map-react';

import { MapDiv } from "./create_event_css.js";
import { withAlert } from 'react-alert'


// console.log()

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
    loaded: false
  };

  componentDidMount() {

    this.props.getComments(this.props.match.params.id);
    this.props.fetchUser(localStorage.getItem("user_id"));
    axios.get(`https://production-taco.herokuapp.com/events/${this.props.match.params.id}`)
    .then(res => {
      // console.log(res)
      this.setState({
        venue: res.data.venue,
        date: res.data.date,
        location: res.data.location,
        posted_by: res.data.author,
        price: res.data.price,
        raiting: res.data.raiting,
        url: res.data.url,
        img_url: res.data.img_url,
        lat: parseFloat(res.data.lat),
        lon: parseFloat(res.data.lon),
        attending: res.data.users,
        loaded: true
      })
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
      posters_email: this.props.user.email
    };

    // const {content, date, posted_by, event_id } = req.body;
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
    
    // const {content, date, posted_by, event_id } = req.body;
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEdit = event => {
    this.setState({ editComment: event.target.value });
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
      // console.log(error)
    })
  }

  render() {
    //console.log(this.props)
    // console.log(this.state.user.email)
    return (
      <div>
      <Nav />

        {this.state.loaded ? (
          <MapDiv>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDM6TcKZH9rWDPAqXx4Yln7_l08ACF5QdA" }}
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


          ) : null}

        <Container>
          <div>
            <button onClick={this.addFav}>Add location to favorites</button>
            <p><img className="yelp_img" src={this.state.img_url}/></p>
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
                    <div>
                      <h4>{attendee.name}</h4>
                    </div>
                  );
                }
              })}
            </div>
            <div className="event-discussion">
              <h2 className="event-discussion-title">Discussion</h2>
              {this.props.comments.map(comment => {
                if (comment !== undefined) {
                  return (
                    <FlexDiv>

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
                      </Comment>
                    </FlexDiv>
                  );
                }
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
            />
          </FormComment>
          <CommentSubmit onClick={this.createComment}>Submit</CommentSubmit>
        </Container>
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
    comments: state.commentsReducer.comments
  };
};

export default connect(mapStateToProps,{getEvent,getComments,fetchUser,makeComment,deleteComment,updateComment})(withAlert()(EventSingle));



// export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(Auth))



