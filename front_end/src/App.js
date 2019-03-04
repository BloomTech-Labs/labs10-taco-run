import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

// --> Components List
import LandingPage from "./components/landing/LandingPage";
import UserSettings from "./components/user/UserSettings";
import GetStarted from "./components/get_started/GetStarted";
import UserProfile from "./components/user/UserProfile";
import UsersProfile from "./components/users/UsersProfile";
import EventList from "./components/events2/EventList";
import CreateEvent from "./components/events2/CreateEvent";
import EventSingle from "./components/events2/EventSingle";

class App extends Component {
  render() {
    return (
      <div>
        {this.props.auth.isEmpty ? (
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        ) : (
          <div>
            <Switch>
              <Route exact path="/events" component={EventList} />
              <Route exact path="/events_create" component={CreateEvent} />
              <Route path="/events/:id" component={EventSingle} />
              <Route exact path="/user-settings" component={UserSettings} />
              <Route exact path="/get-started" component={GetStarted} />
              <Route exact path="/user-profile" component={UserProfile} />
              <Route exact path="/user/:id" component={UsersProfile} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
