import React from 'react';
import Billing from '../billing/Billing.js';
import Nav from '../nav/Nav.js'
import Select from 'react-select';
import './settings.css'
import {ProfileForm, ContainForm, Reset, Switch, SwitchTab} from './user_settings_css.js'
import axios from 'axios';
import { withAlert } from 'react-alert'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

const options = [
  { value: 'phone', label: 'phone' },
  { value: 'email', label: 'email' },
];

class UserSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      phone: '',
      bymail: true,
      byphone: false,
      selectedOption: null,
      profile: true,
      selected: ['', 'active'],
      usersName: '',
      value: ''
    };
  }

  componentDidMount(){
    let id = localStorage.getItem("user_id")
    axios.get(`https://production-taco.herokuapp.com/users/${id}/info`)
    .then(response => {
      //console.log(response)
      this.setState({
        usersName: response.data.name
      })
    })
  }

  // extra in case you need to reference

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  switchToBilling = () => {
    this.setState({
      profile: false,
      selected: ['active', '']
    })
  }

  switchToProfile = () => {
    this.setState({
      profile: true,
      selected: ['', 'active']
    })
  }

  //var className = this.state.clicked ? 'click-state' : 'base-state';

  render() {
    return (
      <div>
        <Nav/>
        <ContainForm>
          <h1>{this.state.usersName}</h1>
          <Switch>
            <div>
              <SwitchTab onClick={this.switchToBilling} className={this.state.selected[0]}>Billing</SwitchTab>
              <SwitchTab onClick={this.switchToProfile} className={this.state.selected[1]}>Profile</SwitchTab>
            </div>
          </Switch>
          {this.state.profile ? 
          (
            <div>
              <ProfileForm>
                <h2>Edit Profile</h2>
                <input
                  type="text"
                  placeholder='Edit Name'
                  onChange={this.handleChange}
                  name="email"
                  value={this.state.email}
                />
                <PhoneInput
                  country="US"
                  placeholder="Enter phone number"
                  value={ this.state.phone }
                  onChange={ phone => this.setState({ phone }) }
                  className="phone-input" 
                />
                <h3>Reminder Method</h3>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleSelect}
                  options={options}
                  isSearchable={true}
                  isMulti={true}
                  className="select"
                />
              </ProfileForm>
              <Reset>Pass Reset Email</Reset>
            </div>
          ) 
            : 
            <div>Billing page here</div>
          }

        </ContainForm>
      </div>
    )
  }
}

export default withAlert()(UserSettings);