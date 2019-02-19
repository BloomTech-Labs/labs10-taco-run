import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props;
    return (
      <div>
        <div>
          {events.map(event => (
            <EventListItem
              key={event.id}
              event={event}
              deleteEvent={deleteEvent}
            />
          ))}
        </div>
        <div>
  				<div>Success</div>
  				<button onClick={this.logOut}>Sign Out</button>
  				<h2>Registerd Accounts</h2>
  				<div>
  					{this.state.users.map(user => {
  						return <div key={user.id}>
  							<p>Name: {user.name}</p>
  							<p>Email: {user.email}</p>
  						</div>
  					})}
  				</div>
  			</div>
      </div>
    );
  }
}

export default EventList;
