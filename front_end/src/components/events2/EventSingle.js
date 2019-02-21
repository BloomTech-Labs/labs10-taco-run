import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getEvent } from "../../store/actions/eventsActions";
import { getComments } from "../../store/actions/commentsActions";
// import { isThisQuarter } from "date-fns";

class EventSingle extends React.Component {
  state = {};

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  render() {
    return (
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
          <h2 className="event-invited-title">Invited</h2>
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
                  <h4>{comment.posted_by}</h4>
                  <h6>{comment.date}</h6>
                  <h5>{comment.content}</h5>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

// mapStateToProps
const mapStateToProps = state => {
  return {
    event: state.eventsReducer.event,
    attendees: state.eventsReducer.attendees,
    comments: state.commentsReducer.comments
  };
};

export default connect(
  mapStateToProps,
  { getEvent, getComments }
)(EventSingle);
