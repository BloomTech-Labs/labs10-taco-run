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
  searchUsers
} from "../../store/actions/userActions";
import {
  fetchFriends,
  addFriend,
  deleteFriend
} from "../../store/actions/friendsActions";
import {
  searchFavorites,
  deleteFavorite
} from "../../store/actions/favoritesActions";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "./UserProfile.css";
import { Container, EditBtn, FlexEnd } from "./userprofile_css.js";
import { DeleteBtn } from "../events2/eventsingle_css.js";

class UserProfile extends React.Component {
  state = {
    search: "",
    favoritesFlag: true,
    value: "All"
  };

  handleChange = e => {
    this.setState({
      search: [e.target.value]
    });
  };

  handleSelect = e => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  };

  handleSubmitFavorites = e => {
    e.preventDefault();
    this.props.searchFavorites(this.state.search);
    this.setState({
      search: ""
    });
    let box = document.getElementById("results");
    box.style.display = "inline-block";
  };

  handleSubmitUsers = e => {
    e.preventDefault();
    this.props.searchUsers(this.state.search);
    this.setState({
      search: ""
    });
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

  friendAdd = event => {
    event.preventDefault();
    let ids = {
      user_id: parseInt(localStorage.getItem("user_id")),
      friends_id: parseInt(event.target.id)
    };
    let obj = { data: ids };
    let cid = obj.data.user_id;
    this.props.addFriend(obj, cid);
  };

  friendDelete = event => {
    event.preventDefault();
    this.props.deleteFriend(localStorage.getItem("user_id"), event.target.id);
  };

  favoriteDelete = event => {
    event.preventDefault();
    let ids = {
      favorite_id: parseInt(event.target.id) // --> this comes from the button element
    };
    let new_obj = { data: ids };
    let favorite_id = new_obj.data.favorite_id; // --> grab favorite_id
    console.log("favoriteDelete invoked");
    console.log(ids.favorite_id); // --> grabs specific id of the favorite inside favorites table
    this.props.deleteFavorite(favorite_id); // --> this was newly made, takes only the favorite_id and will return 1 || 0
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
        <Container>
          <Link to="/user-settings">
            <FlexEnd>
              <EditBtn>edit profile</EditBtn>
            </FlexEnd>
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
                <form onSubmit={this.handleSubmitFavorites}>
                  <input
                    type="search"
                    placeholder="Add a new favorite"
                    value={this.state.search}
                    name="search"
                    onChange={this.handleChange}
                  />
                </form>
                <select
                  className="locationSelect"
                  value={this.state.value}
                  onChange={this.handleSelect}
                >
                  <option className={`location-default`} value="All">
                    All
                  </option>
                  {this.props.favorites.map(favorite => {
                    if (favorite !== undefined) {
                      return (
                        <option
                          className={`location-${favorite.location}`}
                          value={`${favorite.location}`}
                        >
                          {favorite.location}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            ) : (
              <form onSubmit={this.handleSubmitUsers}>
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
                  {this.props.locations.map(result => {
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
                              <h5>{result.name}</h5>
                              <p>{result.location}</p>
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
                            <button onClick={this.friendAdd} id={result.id}>
                              Add
                            </button>
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
            {this.state.value === "All" ? (
              <div id="Favorites" className="tabcontent">
                {this.props.favorites.map(favorite => {
                  return (
                    // <Link to={`/locations/${location.name}`}>
                    <div className={`resultsDisplay ${favorite.location}`}>
                      <div className="location-picture">
                        {/* <img /> */}
                        <h3>{favorite.name}</h3>
                        <p>{favorite.location}</p>
                        <button onClick={this.favoriteDelete} id={favorite.id}>
                          X
                        </button>
                      </div>
                    </div>
                    // </Link>
                  );
                })}
              </div>
            ) : (
              <div id="Favorites" className="tabcontent">
                {this.props.favorites
                  .filter(favorite => favorite.location === this.state.value)
                  .map(favorite => {
                    return (
                      // <Link to={`/locations/${favorite.name}`}>
                      <div className={`resultsDisplay ${favorite.location}`}>
                        <div className="location-picture">
                          {/* <img /> */}
                          <h3>{favorite.name}</h3>
                          <p>{favorite.location}</p>
                        </div>
                      </div>
                      // </Link>
                    );
                  })}
              </div>
            )}

            {/* Friends Tab */}
            <div id="Friends" className="tabcontent">
              {this.props.friends.map(friend => {
                return (
                  // <Link to={`/friends/${friend.id}`}>
                  <div className="resultsDisplay">
                    <div className="location-picture">
                      {/* <img /> */}
                      <button onClick={this.friendDelete} id={friend.id}>
                        X
                      </button>
                      <h3>{friend.name}</h3>
                    </div>
                  </div>
                  // </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    );
  } // --> render() brace
} // --> class brace

// mapStateToProps
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    favorites: state.userReducer.favorites,
    friends: state.friendsReducer.friends,
    users: state.userReducer.users,
    locations: state.favoritesReducer.locations
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUser,
    fetchFavorites,
    fetchFriends,
    searchUsers,
    searchFavorites,
    addFriend,
    deleteFriend,
    deleteFavorite
  }
)(UserProfile);
