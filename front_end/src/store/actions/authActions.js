import axios from 'axios';

const makeAxios = async (name, email) => {
	axios.post('https://production-taco.herokuapp.com/users', {name: name, email: email })
	.then(res => {
		localStorage.setItem('user_id', res.data)
	})
}

export const reset = () => {
	return (dispatch) => {
		dispatch({type: 'RESET ERROR'})
	}
}

export const signIn = (creds) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().signInWithEmailAndPassword(
			creds.email,
			creds.password
		).then((rsp) => {
			console.log(rsp)
			dispatch({type: 'LOGIN_SUCCESS'})
		}).catch(error => {
			console.log(error)
			dispatch({type: 'LOGIN_ERROR', payload: error.message})
		})
	}
}

export const signUp = (user) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
		.then(() => {
			dispatch({type: "SIGNUP_SUCCESS", payload: {user: user.username, email: user.email} })
		})
		.catch(error => {
			console.log(error)
			dispatch({type: 'SIGNUP_ERROR', payload: error.message})
		})
	}
}

export const facebookAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(response => {
			console.log(response)
			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			makeAxios(username, email)
		})
		.then(() => {
			dispatch({type: "FACEBOOK_SUCCESS"})
		})
		.catch(error => {
			console.log(error)
			dispatch({type: 'FACEBOOK_ERROR', payload: error.message})
		})
	}
}

export const twitterAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.TwitterAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(response => {
			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			makeAxios(username, email)
		})
		.then(() => {
			dispatch({type: "TWITTER_SUCCESS"})
		})
		.catch(error => {
			dispatch({type: "TWITTER_ERROR", payload: error.message})
		})
	}
}

export const googleAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(response => {
			//console.log(response)
			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			makeAxios(username, email)
		})
		.then(() => {
			dispatch({type: "GOOGLE_SUCCESS"})
		})
		.catch(error => {
			dispatch({type: "GOOGLE_ERROR", payload: error.message})
		})
	}
}

export const passReset = (email) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().sendPasswordResetEmail(email)
		.then(() => {
			dispatch({type: "RESET_SUCCESS"})
		})
		.catch(error => {
			dispatch({type: "RESET_ERROR", payload: error.message})
		})
	}
}