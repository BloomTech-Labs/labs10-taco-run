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
    return (
      <h1>Drawer Component</h1>
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

export default DrawerBar;