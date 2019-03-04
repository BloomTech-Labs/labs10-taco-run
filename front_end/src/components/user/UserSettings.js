import React from "react";
import Nav from "../nav/Nav.js";
import Select from "react-select";
import "./settings.css";
import {
  ProfileForm,
  ContainForm,
  Reset,
  Switch,
  SwitchTab,
  FlexDiv,
  CenterDiv,
  Submit
} from "./user_settings_css.js";
import axios from "axios";
import { withAlert } from "react-alert";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import Billing from "../billing/Billing.js";
import DrawerBar from "../drawer/Drawer";


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

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption1: "",
      selectedOption2: "",
      selectedOption3: "",
      profile: true,
      selected: ["", "active"],
      value: ""
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
    return (
      <div>
        <DrawerBar />
        <ContainForm>
          <Switch>
            <div>
              <SwitchTab
                onClick={this.switchToBilling}
                className={this.state.selected[0]}
              >
                Billing
              </SwitchTab>
              <SwitchTab
                onClick={this.switchToProfile}
                className={this.state.selected[1]}
              >
                Profile
              </SwitchTab>
            </div>
          </Switch>
          {this.state.profile ? (
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
              <Submit onClick={this.submitEdit}>SUBMIT</Submit>
            </div>
          ) : (
            <Billing />
          )}
        </ContainForm>
      </div>
    );
  }
}

export default withAlert()(UserSettings);
