import React from 'react';

// --> Base imports for redux and to use firebase auth
import { withRouter } from "react-router-dom";
import firebase from 'firebase';
import {connect} from 'react-redux';

// --> Base Imports for the elements used from @material-ui
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// --> Base Imports for the icons used from @material-ui
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import SvgIcon from '@material-ui/core/SvgIcon';

// --> Boilerplate import from Material-UI reference
import classNames from 'classnames';

class DrawerBar extends React.Component {
  state = {
    isOpen: false,
  };

  /*========================= Drawer for Material UI helpers =========================*/

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
  }

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
  }

  /*========================= Drawer for Material UI helpers END =========================*/

  /*============================= Navigation Button Helpers =============================*/

  events = () => {
		this.props.history.push("/events")
	}

	profile = () => {
		this.props.history.push("/user-profile")
	}

	users = () => {
		this.props.history.push("/users")
	}

	started = () => {
		this.props.history.push("/get-started")
	}

	logOut = (event) => {
		event.preventDefault()
		firebase.auth().signOut();
		this.props.history.push("/")
  }

  /*============================= Navigation Button Helpers END =============================*/

  render() {
    const { classes, theme } = this.props; // --> this is to access the style function found below
    return (
      <div className = {classes.root}>
        <CssBaseline /> {/* Seems to only change background color to a lightgrey-ish */}
        <AppBar
          position = "fixed"
          className= {classNames(classes.appBar, {
            [classes.appBarShift]: this.state.isOpen,
          })}
        > {/* Navigation bar */}

          <Toolbar disableGutters = {!this.state.isOpen}>
            <IconButton
              color = "inherit"
              aria-label="Open drawer"
              onClick = {this.handleDrawerOpen}
              className= {classNames(classes.menuButton, {
                [classes.hide]: this.state.isOpen,
              })}
            >
              <MenuIcon /> {/* This is the sandwich icon */}
            </IconButton>

            <Typography variant = "h6" color = "inherit" noWrap>
              Let's Get Tacos
            </Typography>
          </Toolbar> {/* Holds the sandwich bar icon and text from Typography */}
        </AppBar> {/* End of navigation bar */}
        
        {/* Drawer: the little slider thing ! NOTE: A lot of this is boiler-plate */}
        <Drawer
          variant="permanent"
          className= {classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.isOpen,
            [classes.drawerClose]: !this.state.isOpen,
          })}
          classes= {{
            paper: classNames({
              [classes.drawerOpen]: this.state.isOpen,
              [classes.drawerClose]: !this.state.isOpen,
            }),
          }}
          open = {this.state.isOpen}
        >
          <div className = {classes.toolbar}>
            <IconButton onClick = {this.handleDrawerClose}>
              {/* This is to check if the button should render as a ">" or a "<" */}
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} 
            </IconButton>
          </div>

          <Divider /> {/* This is the ----- that shows up */}
          <List> {/* This is the beginning of the side-bar navigation: We map through the possible options and then.... */}
            {['Events Dashboard', 'Profile', 'Users', 'Get Started', 'Sign Out'].map((text, index) => (  
              <div className = "side-menu-wrap" key = {text}> 
              {/* Here for each index (each button / item): we want to render a different icon */}
              {/* <SvgIcon><path></SvgIcon> --> This is to be able to access a huge amount of different icons from `materialdesignicons.com` */}
                {
                  index === 0 ? (
                    <ListItem button key = {text} onClick = {this.events}>
                      <ListItemIcon><HomeIcon /></ListItemIcon>
                      <ListItemText primary = {text} />
                    </ListItem>                                      
                  ) : 
                  index === 1 ? (
                    <ListItem button key = {text} onClick = {this.profile}>
                      <ListItemIcon>
                        <SvgIcon>
                          <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                        </SvgIcon>                        
                      </ListItemIcon>
                      <ListItemText primary = {text} />
                    </ListItem>                                      
                  ) :
                  index === 2 ? (
                    <ListItem button key = {text} onClick = {this.users}>
                      <ListItemIcon>
                        <SvgIcon>
                          <path fill="#000000" d="M7.5,15C8.63,15 9.82,15.26 11.09,15.77C12.35,16.29 13,16.95 13,17.77V20H2V17.77C2,16.95 2.65,16.29 3.91,15.77C5.18,15.26 6.38,15 7.5,15M13,13H22V15H13V13M13,9H22V11H13V9M13,5H22V7H13V5M7.5,8A2.5,2.5 0 0,1 10,10.5A2.5,2.5 0 0,1 7.5,13A2.5,2.5 0 0,1 5,10.5A2.5,2.5 0 0,1 7.5,8Z" />
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText primary = {text} />
                    </ListItem>                                      
                  ) :
                  index === 3 ? (
                    <ListItem button key = {text} onClick = {this.started}>
                      <ListItemIcon>
                        <SvgIcon>
                          <path fill="#000000" d="M7.5,15C8.63,15 9.82,15.26 11.09,15.77C12.35,16.29 13,16.95 13,17.77V20H2V17.77C2,16.95 2.65,16.29 3.91,15.77C5.18,15.26 6.38,15 7.5,15M13,13H22V15H13V13M13,9H22V11H13V9M13,5H22V7H13V5M7.5,8A2.5,2.5 0 0,1 10,10.5A2.5,2.5 0 0,1 7.5,13A2.5,2.5 0 0,1 5,10.5A2.5,2.5 0 0,1 7.5,8Z" />
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText primary = {text} />
                    </ListItem>                                                         
                  ) :
                  index === 4 ? (                    

                    <ListItem button key = {text} onClick = {this.logOut}>
                      <ListItemIcon>
                        <SvgIcon>
                          <path fill="#000000" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText primary = {text} />
                    </ListItem>  
                  ) :
                  null
                }
              </div>                            
            ))}
          </List>
          <Divider />          
        </Drawer>
      </div>                  
    );
  };
};

/* This is the boilerplate styling from the Material-UI reference I used */
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

const mapStateToProps = state => {
  return { auth: state.firebase.auth }
}

/* 
  - Since Material-UI uses `withStyles()`, and redux uses `withRouter()`:
    we had to combine them like this!
*/
export default withRouter(connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(DrawerBar)));