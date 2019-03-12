/* 
  - Have two tabs:
    1. Favorite locations (name & location)
    2. Friends (name & location)
*/
import React from "react";
import { connect } from "react-redux";
import DrawerBar from "../drawer/Drawer";

// --> import userActions
import { fetchOtherUser, searchUsers } from "../../store/actions/userActions";
// --> import friendsActions
import { fetchFriends, addFriend } from "../../store/actions/friendsActions";
// --> import favoritesActions
import {
  fetchFavorites,
  searchFavorites
} from "../../store/actions/favoritesActions";

import { Link } from "react-router-dom";
import "../user/UserProfile.css";
import { Container, EditBtn, FlexEnd } from "../user/userprofile_css.js";

//-------------Material UI------------------
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

// Select imports
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Avatar imports
import Avatar from "@material-ui/core/Avatar";

// List imports for friends
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

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
  // For avatar
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200
  },
  // Profile container
  profileContainer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      maxWidth: "1000px"
    }
  },
  profileDetails: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      marginRight: "100px"
    }
  },
  profileFunctions: {
    [theme.breakpoints.up("md")]: {
      width: "800px"
    }
  }
});

//------------------------------------------

class UsersProfile extends React.Component {
  state = {
    search: "",
    value: "All",
    friendFlag: null,
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
    if (e.target !== box && box.style.display === "inline-block") {
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
      friends_id: parseInt(this.props.match.params.id)
    };
    let obj = { data: ids };
    let cid = obj.data.user_id;
    this.props.addFriend(obj, cid);
  };

  componentDidMount() {
    // fetchOtherUser
    this.props.fetchOtherUser(this.props.match.params.id);
    // fetchFavorites
    this.props.fetchFavorites(this.props.match.params.id);
    // fetchFriends
    this.props.fetchFriends(this.props.match.params.id);
    // Select material ui
    // this.setState({
    //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    // });
  }

  render() {
    // For tabs
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div className="profile">
        <DrawerBar />
        <Container className={classes.profileContainer}>
          <div className={classes.profileDetails}>
            <div className="profile-header">
              <Typography className="profile-name" variant="h3">
                {this.props.user.name}
              </Typography>
              <Avatar
                src={this.props.user.user_pic}
                className={classes.bigAvatar}
              />
            </div>
            <div className="profile-preferences">
              <Typography>
                Tortilla preference: {this.props.user.hard_or_soft}
              </Typography>
              <Typography>Spiciness: {this.props.user.heat_pref}</Typography>
              <Typography>
                Street or Gourmet: {this.props.user.street_gourmet}
              </Typography>{" "}
              <FlexEnd>
                {console.log(this.props.friendFlag)}
                {this.props.friendFlag ? (
                  <EditBtn>User Already Added</EditBtn>
                ) : (
                  <EditBtn onClick={this.friendAdd}>Add as friend</EditBtn>
                )}
              </FlexEnd>
            </div>
          </div>

          <div className={classes.profileFunctions}>
            <div className="profile-search">
              {/* Search Bar */}
              <div className="profile-search-friends">
                {/* Form for Search Results */}
                {this.state.favoritesFlag === true ? (
                  <div>
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
                        return "Favorites map completed";
                      })}
                    </select>
                  </div>
                ) : (
                  <div />
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
                      return "Favorites map completed";
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
                        <List>
                          {this.props.favorites.map(favorite => {
                            return (
                              <ListItem>
                                <div
                                  className={`resultsDisplay ${
                                    favorite.location
                                  }`}
                                >
                                  <div className="location-picture">
                                    {/* <img /> */}
                                    <ListItemText primary={favorite.name} />
                                    <ListItemText primary={favorite.location} />
                                  </div>
                                </div>
                              </ListItem>
                            );
                          })}
                        </List>
                      </div>
                    ) : (
                      <div id="Favorites" className="tabcontent">
                        <List>
                          {this.props.favorites
                            .filter(
                              favorite => favorite.location === this.state.value
                            )
                            .map(favorite => {
                              return (
                                <ListItem>
                                  <div
                                    className={`resultsDisplay ${
                                      favorite.location
                                    }`}
                                  >
                                    <div className="location-picture">
                                      {/* <img /> */}
                                      <ListItemText primary={favorite.name} />
                                      <ListItemText
                                        primary={favorite.location}
                                      />
                                    </div>
                                  </div>
                                </ListItem>
                              );
                            })}
                        </List>
                      </div>
                    )}
                  </TabContainer>
                )}
                {tabValue === 1 && (
                  <TabContainer>
                    {/* Friends Tab */}
                    <List>
                      {this.props.friends.map(friend => {
                        return (
                          <Link to={`/user/${friend.id}`}>
                            <ListItem className="resultsDisplay">
                              <ListItemAvatar className="location-picture">
                                <Avatar src={friend.user_pic} />
                              </ListItemAvatar>
                              <ListItemText primary={friend.name} />
                            </ListItem>
                          </Link>
                        );
                      })}
                    </List>
                  </TabContainer>
                )}
              </div>
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
    friendFlag: state.friendsReducer.friendFlag,
    users: state.userReducer.users,
    locations: state.favoritesReducer.locations
  };
};

export default connect(
  mapStateToProps,
  {
    fetchOtherUser,
    fetchFavorites,
    fetchFriends,
    searchUsers,
    searchFavorites,
    addFriend
  }
)(withStyles(styles, { withTheme: true })(UsersProfile));
