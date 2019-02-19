/* 
  - Have two tabs:
    1. Favorite locations (name & location)
    2. Friends (name & location)
*/
import React from "react";
import { connect } from "react-redux";
import {
  fetchUser,
  fetchFavorites,
  fetchFriends
} from "../../store/actions/userActions";
import "./UserProfile.css";

class UserProfile extends React.Component {
  state = {
    search: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    // fetchUser
    this.props.fetchUser(localStorage.getItem("user_id"));
    // fetchFavorites
    this.props.fetchFavorites(localStorage.getItem("user_id"));
    // fetchFriends
    this.props.fetchFriends(localStorage.getItem("user_id"));
  }

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
    evt.currentTarget.className += "active";
  };

  render() {
    return (
      <div className="profile">
        <div className="profile-details">
          <h1>{this.props.user.name}</h1>
          <h3>Tacos Per Month:</h3>
          <h3>Hard or Soft:</h3>
          <h3>Corn or Flour:</h3>
          <h3>Heat Preferences:</h3>
          <h3>Street or Gourmet:</h3>
        </div>

        {/* Search Bar */}
        <div className="profile-search-friends">
          <input type="text" placeholder="Search.." />
        </div>

        <div className="profile-personal-container">
          {/* Tabs */}
          <div className="tab">
            <button
              className="tablinks"
              onClick={event => this.openTab(event, "Favorites")}
            >
              Favorites
            </button>
            <button
              className="tablinks"
              onClick={event => this.openTab(event, "Friends")}
            >
              Friends
            </button>
          </div>
          <div id="Favorites" className="tabcontent">
            {this.props.favorites.map(favorite => {
              return (
                // <Link to={`/locations/${location.name}`}>
                <div className="resultsDisplay">
                  <div className="location-picture">
                    {/* <img /> */}
                    <h3>{favorite.name}</h3>
                  </div>
                </div>
                // </Link>
              );
            })}
          </div>
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
    friends: state.userReducer.friends
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUser,
    fetchFavorites,
    fetchFriends
  }
)(UserProfile);
