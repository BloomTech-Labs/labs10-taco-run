/* 
  - Have two tabs:
    1. Favorite locations (name & location)
    2. Friends (name & location)
*/
import React from "react";
import { connect } from "react-redux";
import Nav from "../nav/Nav.js";
import {
  fetchUser,
  fetchFavorites,
  fetchFriends,
  searchUsers
} from "../../store/actions/userActions";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "./UserProfile.css";

class UserProfile extends React.Component {
  state = {
    search: "",
    favoritesFlag: true
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    console.log(this.state.search);
    e.preventDefault();
    this.setState({
      search: ""
    });
    this.props.searchUsers(this.state.search);
    let box = document.getElementById("results");
    box.style.display = "inline-block";
  };

  // handle mouse click off results
  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    let box = document.getElementById("results");
    if (e.target != box && box.style.display == "inline-block") {
      box.style.display = "none";
    }
  };

  openTab = (evt, tabName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(tabName).style.display = "block";
    // evt.currentTarget.className += "active";

    // function to set flag to change certain details on page
    if (
      evt.currentTarget.id === "friends" &&
      this.state.favoritesFlag == true
    ) {
      this.setState({
        favoritesFlag: false
      });
    } else if (
      evt.currentTarget.id === "favorites" &&
      this.state.favoritesFlag == false
    ) {
      this.setState({
        favoritesFlag: true
      });
    }
  };

  componentDidMount() {
    // fetchUser
    this.props.fetchUser(localStorage.getItem("user_id"));
    // fetchFavorites
    this.props.fetchFavorites(localStorage.getItem("user_id"));
    // fetchFriends
    this.props.fetchFriends(localStorage.getItem("user_id"));
    // mousedown
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    // mousedown
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  render() {
    return (
      <div className="profile">
        <Nav />
        <Link to="/user-settings">
          <p>edit profile</p>
        </Link>
        <div className="profile-details">
          <h1>{this.props.user.name}</h1>
          <h3>Tacos Per Month: 1000</h3>
          <h3>Hard or Soft: Soft tacos are real tacos</h3>
          <h3>Corn or Flour: Flour is for burritos</h3>
          <h3>Heat Preferences: CALIENTE</h3>
          <h3>Street or Gourmet: Street</h3>
        </div>

        {/* Search Bar */}
        <div className="profile-search-friends">
          {/* Form for Search Results */}
          {this.state.favoritesFlag === true ? (
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="search"
                  placeholder="Add a new favorite"
                  value={this.state.search}
                  name="search"
                  onChange={this.handleChange}
                />
              </form>
              <select>
                {this.props.favorites.map(favorite => {
                  if (favorite !== undefined) {
                    return (
                      <option className={`location-${favorite.location}`}>
                        {favorite.location}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <input
                type="search"
                placeholder="Find a new friend"
                value={this.state.search}
                name="search"
                onChange={this.handleChange}
              />
            </form>
          )}

          <div className="results-container">
            {this.state.favoritesFlag === true ? (
              // Results for Favorites
              <div id="results" ref={node => (this.node = node)}>
                {this.props.favorites.map(result => {
                  if (result !== undefined) {
                    return (
                      <Link to={`/${result.id}`}>
                        <div className="result-display">
                          <div className="result-image">
                            {/* <img
                        alt="User"
                        src={}
                      /> */}
                          </div>
                          <div className="result-name">
                            <h3>{result.name}</h3>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : (
              // Results for Users
              <div id="results" ref={node => (this.node = node)}>
                {this.props.users.map(result => {
                  if (result !== undefined) {
                    return (
                      <Link to={`/${result.id}`}>
                        <div className="result-display">
                          <div className="result-image">
                            {/* <img
                          alt="User"
                          src={}
                        /> */}
                          </div>
                          <div className="result-name">
                            <h3>{result.name}</h3>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>

        <div className="profile-personal-container">
          {/* Tabs */}
          <div className="tab">
            <button
              id="favorites"
              className="tablinks"
              onClick={event => this.openTab(event, "Favorites")}
            >
              Favorites
            </button>
            <button
              id="friends"
              className="tablinks"
              onClick={event => this.openTab(event, "Friends")}
            >
              Friends
            </button>
          </div>

          {/* Favorites Tab */}
          <div id="Favorites" className="tabcontent">
            {this.props.favorites.map(favorite => {
              return (
                // <Link to={`/locations/${location.name}`}>
                <div className={`resultsDisplay ${favorite.location}`}>
                  <div className="location-picture">
                    {/* <img /> */}
                    <h3>{favorite.name}</h3>
                  </div>
                </div>
                // </Link>
              );
            })}
          </div>

          {/* Friends Tab */}
          <div id="Friends" className="tabcontent">
            {this.props.friends.map(friend => {
              return (
                // <Link to={`/friends/${friend.id}`}>
                <div className="resultsDisplay">
                  <div className="location-picture">
                    {/* <img /> */}
                    <h3>{friend.name}</h3>
                  </div>
                </div>
                // </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  } // --> render() brace
} // --> class brace

// mapStateToProps
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    favorites: state.userReducer.favorites,
    friends: state.userReducer.friends,
    users: state.userReducer.users
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUser,
    fetchFavorites,
    fetchFriends,
    searchUsers
  }
)(UserProfile);
