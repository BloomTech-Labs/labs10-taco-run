import React from 'react';
import axios from 'axios';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/iconic/css/material-design-iconic-font.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/animsition/css/animsition.min.css';
import './vendor/select2/select2.min.css';
import './vendor/daterangepicker/daterangepicker.css';
import './css/main.css';
import './css/util.css';
import './custom.css';
import Popup from 'reactjs-popup'
import ErrorAlert from '../alerts/ErrorAlert.js';

import {signIn, signUp, facebookAuth, twitterAuth, googleAuth, githubAuth, passReset} from '../../store/actions/authActions.js';
import {connect} from 'react-redux';
import {FormE} from './auth_css.js';

class Auth extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			logEmail: '',
			logPass: '',
			SignUpName: '',
			SignUpPass: '',
			SignUpConfirm: '',
			SignUpEmail: '',
			resetEmail: '',
			log: true,
		};
	}

	componentDidMount(){}

	swapLog = (event) => {
		event.preventDefault()
		this.setState({
			log: !this.state.log,
			logEmail: '',
			logPass: '',
			SignUpName: '',
			SignUpPass: '',
			SignUpConfirm: '',
			SignUpEmail: '',
		})
	}

	Reset = () => {
		let email = this.state.resetEmail
		this.props.passReset(email)
		alert('email sent')
		this.setState({
			resetEmail: '',
		})
	}

	Google = () => {
		this.props.googleAuth()
	}

	Twitter = () => {
		this.props.twitterAuth()
	}

	Facebook = () => {
		this.props.facebookAuth()
	}


	SignIn = (event) => {
		event.preventDefault()
		let user = {email: this.state.logEmail, password: this.state.logPass}
		axios.post('https://production-taco.herokuapp.com/users', {name: '', email: this.state.logEmail})
		.then(resp => {
			console.log(resp.data)
			console.log(user)
			localStorage.setItem('user_id', resp.data)
		}).then(() => {
			this.props.signIn(user)
		})
	}

	SignUp = (event) => {
		event.preventDefault()
		// username: user.username, email: user.email
		if (this.state.SignUpPass !== this.state.SignUpConfirm){
			alert('password and password confirm does not match')
			return
		}

		let user = {username: this.state.SignUpName, email: this.state.SignUpEmail, password: this.state.SignUpPass}

		axios.post('https://production-taco.herokuapp.com/users', {name: this.state.SignUpName,email: this.state.SignUpEmail})
		.then(resp => {

			localStorage.setItem('user_id', resp.data)
		})
		.then(() => {

		/*
			nice work around to make them be called one at a time
			this way the not authorized page does not show up for a few seconds
			before the props has a change to update.
		*/

			window.setTimeout (() => { this.props.signUp(user) }, 0);
	    window.setTimeout (() => { this.setState({logEmail: '', logPass: '', SignUpName: '', SignUpPass: '', SignUpConfirm: '', SignUpEmail: '' }) }, 0);
		})
	}

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

	render() {
		console.log(this.props)
		return (
			<div>
				{this.state.log ? (
					<div className="limiter">

					{this.props.error ? (
							<ErrorAlert/>
						) : null}


						<div className="container-login100 custom">
							<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
								<form className="login100-form validate-form">
									<span className="login100-form-title p-b-49">
										Login
									</span>


									<div className="wrap-input100 validate-input m-b-23" data-validate = "User Email is reauired">
										<span className="label-input100">User Email</span>

										<input 
											className="input100" 
											type="text" 
											name="logEmail" 
											placeholder="Type your email"
											value={this.state.logEmail}
											onChange={this.handleChange}
										/>

										<span className="focus-input100" data-symbol="&#xf206;"></span>
									</div>

									<div className="wrap-input100 validate-input" data-validate="Password is required">
										<span className="label-input100">Password</span>

										<input 
											className="input100" 
											type="password" 
											name="logPass" 
											placeholder="Type your password"
											value={this.state.logPass}
											onChange={this.handleChange}
										/>

										<span className="focus-input100" data-symbol="&#xf190;"></span>
									</div>

									<Popup trigger={<div className="text-right p-t-8 p-b-31"><div className="btnclick">Forgot password?</div></div>} modal>

	
							  		{close => {
								  		return <FormE>
								  			<div>
								  				<div></div>
									  			<p onClick={close}>X</p>
								  			</div>
										  	<input
										  		type="text"
										  		name="resetEmail"
										  		placeholder="Enter Reset Email"
										  		onChange={this.handleChange}
										  		value={this.state.resetEmail}
										  	/>
										  	<p onClick={() => {this.Reset(); close()}}>send reset</p>
										  </FormE>
							  		}}									  
									</Popup>
									
									<div className="container-login100-form-btn">
										<div className="wrap-login100-form-btn">
											<div className="login100-form-bgbtn"></div>
											<button className="login100-form-btn" onClick={this.SignIn}>
												Login
											</button>
										</div>
									</div>

									<div className="txt1 text-center p-t-54 p-b-20">
										<span>
											Or Authenticate Using
										</span>
									</div>

									<div className="flex-c-m spacing">
										<div className="login100-social-item bg1" onClick={this.Facebook}>
											<i className="fa fa-facebook"></i>
										</div>

										<div className="login100-social-item bg2" onClick={this.Twitter}>
											<i className="fa fa-twitter"></i>
										</div>

										<div className="login100-social-item bg3" onClick={this.Google}>
											<i className="fa fa-google"></i>
										</div>
									</div>

									<div className="flex-col-c ">
										<span className="txt1 p-b-17">
											Or Sign Up Using
										</span>

										<button className="txt2" onClick={this.swapLog}>
											Sign Up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					) : 

					<div className="limiter">

						{this.props.error ? (
							<ErrorAlert />
						) : null}


						<div className="container-login100 custom">
							<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
								<form className="login100-form validate-form">
									<span className="login100-form-title p-b-49">
										Sign Up
									</span>

									<div className="wrap-input100 validate-input m-b-23">
										<span className="label-input100">Username</span>

										<input 
											className="input100" 
											type="text" 
											name="SignUpName" 
											placeholder="Type your username"
											value={this.state.SignUpName}
											onChange={this.handleChange}
										/>

										<span className="focus-input100" data-symbol="&#xf206;"></span>
									</div>


									<div className="wrap-input100 validate-input m-b-23">
										<span className="label-input100">Email</span>

										<input 
											className="input100" 
											type="text" 
											name="SignUpEmail" 
											placeholder="Type your email"
											value={this.state.SignUpEmail}
											onChange={this.handleChange}
										/>

										<span className="focus-input100" data-symbol="&#xf206;"></span>
									</div>



									<Popup modal>

	
							  		{close => {
								  		return <FormE>
								  			<div>
								  				<div></div>
									  			<p onClick={close}>X</p>
								  			</div>
										  	<input
										  		type="text"
										  		name="resetEmail"
										  		placeholder="Enter Reset Email"
										  		onChange={this.handleChange}
										  		value={this.state.resetEmail}
										  	/>
										  	<p onClick={() => {this.Reset(); close()}}>send reset</p>
										  </FormE>
							  		}}									  
									</Popup>



									<div className="wrap-input100 validate-input">
										<span className="label-input100">Password</span>

										<input 
											className="input100" 
											type="password" 
											name="SignUpPass"
											placeholder="Type your password"
											value={this.state.SignUpPass}
											onChange={this.handleChange}
										/>

										<span className="focus-input100" data-symbol="&#xf190;"></span>
									</div>


									<div className="wrap-input100 validate-input m-b-23 top">
										<span className="label-input100">Password Confirm</span>

										<input 
											className="input100" 
											type="password" 
											name="SignUpConfirm" 
											placeholder="Confirm your password"
											value={this.state.SignUpConfirm}
											onChange={this.handleChange}
										/>

										<span className="focus-input100" data-symbol="&#xf206;"></span>
									</div>
									
									<div className="container-login100-form-btn">
										<div className="wrap-login100-form-btn">
											<div className="login100-form-bgbtn"></div>
											<button className="login100-form-btn" onClick={this.SignUp}>
												Sign Up
											</button>
										</div>
									</div>
									<div className="flex-col-c top">
										<button className="txt2" onClick={this.swapLog}>
											LogIn
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				}
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		error: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (user) => dispatch(signUp(user)),
		signIn: (user) => dispatch(signIn(user)),
		twitterAuth: () => dispatch(twitterAuth()),
		facebookAuth: () => dispatch(facebookAuth()),
		googleAuth: () => dispatch(googleAuth()),
		passReset: (email) => dispatch(passReset(email))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);