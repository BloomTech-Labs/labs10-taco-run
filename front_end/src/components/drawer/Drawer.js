import React from "react";

// --> Base imports for redux and to use firebase auth
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";

// --> Base Imports for the elements used from @material-ui
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// --> Base Imports for the icons used from @material-ui
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import HomeIcon from '@material-ui/icons/Home';
import SvgIcon from "@material-ui/core/SvgIcon";

// --> Boilerplate import from Material-UI reference
import classNames from "classnames";

/* This is the boilerplate styling from the Material-UI reference I used */
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    paddingBottom: 100,
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 56
    },
    [theme.breakpoints.up("sm")]: {
      paddingBottom: 64
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: 100
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    [theme.breakpoints.down("xs")]: {
      margin: "0"
    }
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1
  },
  topText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  rightText: {
    marginRight: 25,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class DrawerBar extends React.Component {
  state = {
    isOpen: false
  };

  /*========================= Drawer for Material UI helpers =========================*/

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
  };

  /*========================= Drawer for Material UI helpers END =========================*/

  /*============================= Navigation Button Helpers =============================*/

  events = () => {
    this.props.history.push("/events");
  };

  profile = () => {
    this.props.history.push("/user-profile");
  };

  createEvent = () => {
    this.props.history.push("/events_create");
  };

  settings = () => {
    this.props.history.push("/user-settings");
  };

  logOut = event => {
    event.preventDefault();
    firebase.auth().signOut();
    this.props.history.push("/");
  };

  /*============================= Navigation Button Helpers END =============================*/

  render() {
    const { classes, theme } = this.props; // --> this is to access the style function found below
    return (
      <div className={classes.root}>
        <CssBaseline />{" "}
        {/* Seems to only change background color to a lightgrey-ish */}
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.isOpen
          })}
        >
          {" "}
          {/* Navigation bar */}
          <Toolbar disableGutters={!this.state.isOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.isOpen
              })}
            >
              <MenuIcon /> {/* This is the sandwich icon */}
            </IconButton>
            <div className={classes.topText}>
              <Typography variant="h6" color="inherit" noWrap>
                Let's Get Tacos
              </Typography>
              <Typography
                className={classes.rightText}
                variant="h6"
                color="inherit"
                noWrap
              >
                Welcome, {this.props.auth.displayName}
              </Typography>
            </div>
          </Toolbar>{" "}
          {/* Holds the sandwich bar icon and text from Typography */}
        </AppBar>{" "}
        {/* End of navigation bar */}
        {/* Drawer: the little slider thing ! NOTE: A lot of this is boiler-plate */}
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.isOpen,
            [classes.drawerClose]: !this.state.isOpen
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.isOpen,
              [classes.drawerClose]: !this.state.isOpen
            })
          }}
          open={this.state.isOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {/* This is to check if the button should render as a ">" or a "<" */}
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider /> {/* This is the ----- that shows up */}
          <List>
            {" "}
            {/* This is the beginning of the side-bar navigation: We map through the possible options and then.... */}
            {[
              "Events Dashboard",
              "Create Event",
              "Profile",
              "Settings",
              "Sign Out"
            ].map((text, index) => (
              <div className="side-menu-wrap" key={text}>
                {/* Here for each index (each button / item): we want to render a different icon */}
                {/* <SvgIcon><path></SvgIcon> --> This is to be able to access a huge amount of different icons from `materialdesignicons.com` */}
                {index === 0 ? (
                  <ListItem button key={text} onClick={this.events}>
                    <ListItemIcon>
                      <SvgIcon>
                        <path
                          fill="#000000"
                          d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"
                        />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ) : index === 1 ? (
                  <ListItem button key={text} onClick={this.createEvent}>
                    <ListItemIcon>
                      <SvgIcon>
                        <path
                          fill="#000000"
                          d="M9,11.5A2.5,2.5 0 0,0 11.5,9A2.5,2.5 0 0,0 9,6.5A2.5,2.5 0 0,0 6.5,9A2.5,2.5 0 0,0 9,11.5M9,2C12.86,2 16,5.13 16,9C16,14.25 9,22 9,22C9,22 2,14.25 2,9A7,7 0 0,1 9,2M15,17H18V14H20V17H23V19H20V22H18V19H15V17Z"
                        />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ) : index === 2 ? (
                  <ListItem button key={text} onClick={this.profile}>
                    <ListItemIcon>
                      <SvgIcon>
                        <path
                          fill="#000000"
                          d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                        />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ) : index === 3 ? (
                  <ListItem button key={text} onClick={this.settings}>
                    <ListItemIcon>
                      <SvgIcon>
                        <path
                          fill="#000000"
                          d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                        />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ) : index === 4 ? (
                  <ListItem button key={text} onClick={this.logOut}>
                    <ListItemIcon>
                      <SvgIcon>
                        <path
                          fill="#000000"
                          d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                        />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ) : null}
              </div>
            ))}
          </List>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

/* 
  - Since Material-UI uses `withStyles()`, and redux uses `withRouter()`:
    we had to combine them like this!
*/
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(withStyles(styles, { withTheme: true })(DrawerBar))
);
