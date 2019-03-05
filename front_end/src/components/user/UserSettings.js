import React from "react";
import Select from "react-select";
import "./settings.css";
import {
  ProfileForm,
  ContainForm,
  Reset,
  Switch,
  SwitchTab,
  FlexDiv,  
  Submit
} from "./user_settings_css.js";
import axios from "axios";
import { withAlert } from "react-alert";
import PhoneInput from "react-phone-number-input";
import Billing from "../billing/Billing.js";
import DrawerBar from "../drawer/Drawer";
import PropTypes from "prop-types";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import {connect} from 'react-redux';
// import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';


const options1 = [
  { value: "Soft", label: "Soft" },
  { value: "Hard", label: "Hard" }
];

const options2 = [
  { value: "Mild", label: "Mild" },
  { value: "Medium", label: "Medium" },
  { value: "Spicy", label: "Spicy" },
  { value: "HOT!", label: "HOT!" }
];

const options3 = [
  { value: "Street", label: "Street" },
  { value: "Gourmet", label: "Gourmet" }
];

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

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption1: "",
      selectedOption2: "",
      selectedOption3: "",
      profile: true,
      selected: ["", "active"],
      value: "",
      tabvalue: 0,
    };
  }

  componentDidMount() {
    let id = localStorage.getItem("user_id");
    axios
      .get(`https://production-taco.herokuapp.com/users/${id}/info`)
      .then(response => {
        console.log(response);
        this.setState({
          name: response.data.name,
          phone: response.data.phone
        });
      });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTabChange = (event, tabvalue) => {
    this.setState({ tabvalue });
  };

  handleSelect1 = selectedOption1 => {
    this.setState({ selectedOption1 });
  };

  handleSelect2 = selectedOption2 => {
    this.setState({ selectedOption2 });
  };

  handleSelect3 = selectedOption3 => {
    this.setState({ selectedOption3 });
  };

  switchToBilling = () => {
    this.setState({
      profile: false,
      selected: ["active", ""]
    });
  };

  switchToProfile = () => {
    this.setState({
      profile: true,
      selected: ["", "active"]
    });
  };

  submitEdit = event => {
    event.preventDefault();


    let edited_user = {
      hard_or_soft: this.state.selectedOption1.value,
      heat_pref: this.state.selectedOption2.value,
      street_gourmet: this.state.selectedOption3.value
    };

    let id = localStorage.getItem("user_id");
    axios
      .put(`https://production-taco.herokuapp.com/users/${id}`, edited_user)
      .then(response => {
        console.log(response);
        this.setState({
          selectedOption1: "",
          selectedOption2: "",
          selectedOption3: "",
        });
      });
      this.props.alert.show('preferences updated')
      this.props.history.push('user-profile')
  };

  render() {

    const { classes } = this.props;
    const { tabvalue } = this.state;
    return (
      <div>
        <DrawerBar />
        <div>
        <ContainForm>
                  <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs tabvalue={tabvalue} onChange={this.handleTabChange}>
                      <Tab label="Billing" />
                      <Tab label="Profile" />
                    </Tabs>
                  </AppBar>
                  {tabvalue === 0 && <TabContainer onClick={this.switchToBilling}
                      className={this.state.selected[0]}><Billing /></TabContainer>}
                  {tabvalue === 1 && <TabContainer onClick={this.switchToProfile}
                      className={this.state.selected[1]} >
                        <div>
                    <h2 className="prefs">User Preferences</h2>
                    <FlexDiv>
                      <div>
                        <h3>Shell Type</h3>
                        <Select
                          value={this.state.selectedOption1}
                          onChange={this.handleSelect1}
                          options={options1}
                          className="select"
                        />
                      </div>
                      <div>
                        <h3>Spiciness</h3>
                        <Select
                          value={this.state.selectedOption2}
                          onChange={this.handleSelect2}
                          options={options2}
                          className="select"
                        />
                      </div>
                      <div>
                        <h3>Restaurant Type</h3>
                        <Select
                          value={this.state.selectedOption3}
                          onChange={this.handleSelect3}
                          options={options3}
                          className="select"
                        />
                      </div>
                    </FlexDiv>
                    <Button variant="contained" size="small" className={classes.button} onClick={this.submitEdit}>
                    <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    SUBMIT
                  </Button>
                    {/* <Submit onClick={this.submitEdit}>SUBMIT</Submit> */}
                  </div>
                      
                      </TabContainer>}
                  {/* {tabvalue === 2 && <TabContainer>Item Three</TabContainer>} */}
                </div>
        </ContainForm>
        </div>
      
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  button: {
    margin: theme.spacing.unit,
    height: 40
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  pmarg: {
    marginBottom: 10
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: "grey",
    width: "89%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },  
});


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    error: state.auth.authError
  }
}
// export default withAlert()(UserSettings);
export default compose(
  withAlert(),
  withStyles(styles, {withTheme: true}),
  connect(mapStateToProps, null ))(UserSettings);
