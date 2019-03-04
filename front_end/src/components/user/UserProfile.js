/* 
  - Have two tabs:
    1. Favorite locations (name & location)
    2. Friends (name & location)
*/
import React from "react";
import { connect } from "react-redux";
import Nav from "../nav/Nav.js";
import DrawerBar from "../drawer/Drawer";

// --> import userActions
import { fetchUser, searchUsers } from "../../store/actions/userActions";
// --> import friendsActions
import {
  fetchFriends,
  addFriend,
  deleteFriend
} from "../../store/actions/friendsActions";
// --> import favoritesActions
import {
  fetchFavorites,
  searchFavorites,
  deleteFavorite
} from "../../store/actions/favoritesActions";

import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "./UserProfile.css";
import { Container, EditBtn, FlexEnd } from "./userprofile_css.js";
import { DeleteBtn } from "../events2/eventsingle_css.js";

//-------------Material UI------------------
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

// Select imports
import ReactDOM from "react-dom";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Search field imports
import TextField from "@material-ui/core/TextField";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap"
  },
  // For select
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 0
  },
  // For search field
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

//------------------------------------------

class UserProfile extends React.Component {
  state = {
    search: "",
    value: "All",
    // For tabs
    tabValue: 0,
    // For select
    name: "hai",
    labelWidth: 0
  };

  // For tabs
  handleChangeTabs = (event, tabValue) => {
    this.setState({ tabValue });
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

  favoriteAdd = event => {
    event.preventDefault();
    let ids = {
      user_id: parseInt(localStorage.getItem("user_id")),
      friends_id: parseInt(event.target.id)
    };
    let obj = { data: ids };
    let cid = obj.data.user_id;
    this.props.addFavorite(obj, cid);
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
    let ids = {
      user_id: parseInt(localStorage.getItem("user_id")),
      friends_id: parseInt(event.target.id)
    };
    this.props.deleteFriend(ids, parseInt(event.target.id));
  };

  favoriteDelete = event => {
    event.preventDefault();
    this.props.deleteFavorite(event.target.id);
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
    // Select material ui
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  componentWillUnmount() {
    // mousedown
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  render() {
    // For tabs
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div className="profile">
        <DrawerBar />
        <Container>
          <Link to="/user-settings">
            <FlexEnd>
              <EditBtn>edit profile</EditBtn>
            </FlexEnd>
          </Link>
          <div className="profile-details">
            <h1>{this.props.user.name}</h1>
            <h3>Shell preference: {this.props.user.hard_or_soft}</h3>
            <h3>Street or Gourmet: {this.props.user.street_gourmet}</h3>
            <h3>Spiciness: {this.props.user.heat_pref}</h3>
          </div>

          {/* Search Bar */}
          <div className="profile-search-friends">
            {/* Form for Search Results */}
            {this.state.tabValue === 0 ? (
              <div>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                  onSubmit={this.handleSubmitFavorites}
                >
                  <TextField
                    id="standard-search"
                    label="Find a new favorite"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    value={this.state.search}
                    onChange={this.handleChange}
                  />
                </form>
              </div>
            ) : (
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={this.handleSubmitUsers}
              >
                <TextField
                  id="standard-search"
                  label="Find a new friend"
                  type="search"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
              </form>
            )}

            <div className="results-container">
              {this.state.tabValue === 0 ? (
                // Results for Favorites
                <div id="results" ref={node => (this.node = node)}>
                  {this.props.locations.map(result => {
                    if (result !== undefined) {
                      return (
                        <Link to={`/${result.id}`}>
                          <div className="result-display">
                            <button onClick={this.favoriteAdd} id={result.id}>
                              Add
                            </button>
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
                        <Link to={`user/${result.id}`}>
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

          {this.state.tabValue === 0 && (
            <form className={classes.root} autoComplete="off">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  Location
                </InputLabel>
                <Select
                  value={this.state.value}
                  onChange={this.handleSelect}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="age"
                      id="outlined-age-simple"
                    />
                  }
                >
                  <MenuItem value="All">
                    <em>All</em>
                  </MenuItem>
                  {this.props.favorites.map(favorite => {
                    if (favorite !== undefined) {
                      return (
                        <MenuItem
                          className={`location-${favorite.location}`}
                          value={`${favorite.location}`}
                        >
                          {favorite.location}
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
              </FormControl>
            </form>
          )}

          <div className="profile-personal-container">
            {/* Tabs */}
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs value={tabValue} onChange={this.handleChangeTabs}>
                  <Tab label="Favorite" />
                  <Tab label="Friends" />
                </Tabs>
              </AppBar>
              {tabValue === 0 && (
                <TabContainer>
                  {/* Favorites Tab */}
                  {this.state.value === "All" ? (
                    <div id="Favorites" className="tabcontent">
                      {this.props.favorites.map(favorite => {
                        return (
                          // <Link to={`/locations/${location.name}`}>
                          <div
                            className={`resultsDisplay ${favorite.location}`}
                          >
                            <div className="location-picture">
                              {/* <img /> */}
                              <h3>{favorite.name}</h3>
                              <p>{favorite.location}</p>
                              <button
                                onClick={this.favoriteDelete}
                                id={favorite.id}
                              >
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
                        .filter(
                          favorite => favorite.location === this.state.value
                        )
                        .map(favorite => {
                          return (
                            // <Link to={`/locations/${favorite.name}`}>
                            <div
                              className={`resultsDisplay ${favorite.location}`}
                            >
                              <div className="location-picture">
                                {/* <img /> */}
                                <h3>{favorite.name}</h3>
                                <p>{favorite.location}</p>
                                <button
                                  onClick={this.favoriteDelete}
                                  id={favorite.id}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                            // </Link>
                          );
                        })}
                    </div>
                  )}
                </TabContainer>
              )}
              {tabValue === 1 && (
                <TabContainer>
                  {/* Friends Tab */}
                  {this.props.friends.map(friend => {
                    return (
                      <Link to={`/user/${friend.id}`}>
                        <div className="resultsDisplay">
                          <div className="location-picture">
                            {/* <img /> */}
                            <button onClick={this.friendDelete} id={friend.id}>
                              X
                            </button>
                            <h3>{friend.name}</h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </TabContainer>
              )}
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
    favorites: state.favoritesReducer.favorites,
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
)(withStyles(styles, { withTheme: true })(UserProfile));
