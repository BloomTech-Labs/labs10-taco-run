import React from 'react';
import Nav from '../nav/Nav.js'
import running from './running.png'
import { MainDiv, TopHr, BottomHr } from './started_css.js'
import { Link } from "react-router-dom";
import { CreateLink, ContainLink } from '../events2/eventlist_css.js';
import DrawerBar from "../drawer/Drawer";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';
import CssBaseline from '@material-ui/core/CssBaseline';

class GetStarted extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){

  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <DrawerBar />
        <TopHr />
        <MainDiv>
          <div className={classes.mainFeaturedPost}>
          <div className={classes.layout}>
            <div>
              <h2>Welcome to<br/>Let's Get Tacos</h2>
              <h3>A free taco event site</h3>
            </div>
            <p>
              Make events, make friends, share memories, and most importantly share Tacos.
              Feel to view all the users to see what is going on. Check the up coming calendar to see what events popular.
              Create your own event too. Don't forget to share on social media! Lets eat!
            </p>
            <ContainLink>
              <Link to="events_create">
                <Button variant="outlined" size="medium">
                  Create Event
                </Button>
              
              </Link>
            </ContainLink>
          </div>
          </div>
          <div>
            <img className={classes.imgRun} src={running}/>
          </div>
        </MainDiv>
        <BottomHr/>
      </div>
    )
  }
}

const styles = theme => ({

  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    // [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
    //   width: 1100,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
  },
  ingRun: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 6,

  },

});

// export default GetStarted;
export default withStyles(styles)(GetStarted);