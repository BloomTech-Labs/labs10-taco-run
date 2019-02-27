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