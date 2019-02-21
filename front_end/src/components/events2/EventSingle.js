import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getEvent } from "../../store/actions/eventsActions";
import { getComments, makeComment, deleteComment } from "../../store/actions/commentsActions";
import { Comment, FormComment, CommentSubmit, DeleteBtn } from './eventsingle_css.js'
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

import { Container } from './eventsingle_css.js'
import Nav from '../nav/Nav.js'
import { fetchUser } from "../../store/actions/userActions";

class EventSingle extends React.Component {
  state = {
    content: '',
  };

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
    this.props.fetchUser(localStorage.getItem("user_id"));
  }

  createComment = (event) => {
    event.preventDefault()

    let today = new Date().toDateString();
    let comment = {
      content: this.state.content,
      date: today,
      posted_by: this.props.user.name,
      event_id: parseInt(this.props.match.params.id)
    }
    // const {content, date, posted_by, event_id } = req.body;
    this.props.makeComment(comment)
    this.setState({
      content: '',
    })
  }

  commentDelete = (event) => {
    event.preventDefault()
    let ids = {comment_id: parseInt(event.target.id), event_id: parseInt(this.props.match.params.id)}
    let obj = {comment_id: 11, event_id: 1}
    this.props.deleteComment(obj)
  }

    



  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Nav/>
        <Container>
          <div className="event-single">
            <div className="event-details">
              <h1 className="event-detail-title">{this.props.event.venue}</h1>
              <h2 className="event-detail-date">Date: {this.props.event.date}</h2>
              <div className="event-detail-location">
                <img className="location-image" />
                <h3 className="location-details">{this.props.event.location}</h3>
                <div className="location-google" />
              </div>
            </div>
            <div className="event-invited">
              <h2 className="event-invited-title">Attending</h2>
              {this.props.attendees.map(attendee => {
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
                    <div>
                      <If condition={this.props.user.name === comment.posted_by}>
                        <Then>
                          <DeleteBtn onClick={this.commentDelete} id={comment.id}>X</DeleteBtn>
                        </Then>
                      </If>
                      <Comment key={comment.id}>
                        <h4> - {comment.posted_by}</h4>
                        <h6>{comment.date}</h6>
                        <h5>{comment.content}</h5>
                      </Comment>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <FormComment onSubmit={this.createComment}>
            <textarea
              type="text"
              placeholder='Add a comment or upload image'
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

export default connect(
  mapStateToProps,
  { getEvent, getComments, fetchUser, makeComment, deleteComment }
)(EventSingle);