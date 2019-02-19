import React from 'react';
import Billing from '../billing/Billing.js';
import Nav from '../nav/Nav.js'
import Select from 'react-select';
import './settings.css'
import {ProfileForm, ContainForm, Reset, Switch, SwitchTab} from './user_settings_css.js'
//import axios from 'axios';

const options = [
  { value: 'phone', label: 'phone' },
  { value: 'email', label: 'email' },
];

class UserSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      bymail: true,
      byphone: false,
      selectedOption: null,
    };
  }

  componentDidMount(){}

  // extra in case you need to reference

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    return (
      <div>
        <Nav/>
        <ContainForm>
          <Switch>
            <div>
              <SwitchTab>Billing</SwitchTab>
              <SwitchTab>Profile</SwitchTab>
            </div>
          </Switch>
          <ProfileForm>
            <h2>Edit Profile</h2>
            <input
              type="text"
              placeholder='Edit Email'
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
            />
            <input
              type="text"
              placeholder='Edit Name'
              onChange={this.handleChange}
              name="name"
              value={this.state.name}
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
        </ContainForm>
      </div>
    )
  }
}

export default UserSettings;