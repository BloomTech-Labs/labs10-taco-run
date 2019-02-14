import axios from 'axios';


/*
	there are two helper functions I made to make my axios calls
	so I can both sign in user and get the users id on localstorage for future calls
*/

const makeSocial = async (username, email, id, cb, firebase) => {
	await cb(username, email)
	return firebase.database().ref(`users/${id}`).set({
		username: username, email: email
	})
}

const makeAxios = async (name, email) => {
	axios.post('https://production-taco.herokuapp.com/users', {name: name, email: email })
	.then(res => {
		localStorage.setItem('user_id', res.data)
	})
}

export const signIn = (creds) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().signInWithEmailAndPassword(
			creds.email,
			creds.password
		).then(response => {
			//console.log(response)
			dispatch({type: 'LOGIN_SUCCESS'})
		}).catch(err => {
			console.log(err)
			dispatch({type: 'LOGIN_ERROR', err})
		})
	}
}

export const signUp = (user) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
		.then(response => {
			//console.log(response);
			return firebase.database().ref(`users/${response.user.uid}`).set({
				username: user.username, email: user.email
			})
		})
		.then(() => {
			dispatch({type: "SIGNUP_SUCCESS", payload: {user: user.username, email: user.email} })
		})
		.catch(error => {
			dispatch({type: 'SIGNUP_ERROR'})
		})
	}
}

export const facebookAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(response => {
			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			let id = response.additionalUserInfo.profile.id
			makeSocial(username, email, id, makeAxios, firebase)
		})
		.then(() => {
			dispatch({type: "FACEBOOK_SUCCESS"})
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

			/*
				emailed twitter support about it being ok to get email
				waiting on response, until then will fill in
				with name@twitter.com
				instead of 
				let email = response.additionalUserInfo.profile.email
			*/

			let email = 'name@twitter.com'
			let id = response.additionalUserInfo.profile.id
			//console.log(response)
			makeSocial(username, email, id, makeAxios, firebase)
			dispatch({type: "TWITTER_SUCCESS"})
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
			let id = response.additionalUserInfo.profile.id
			makeSocial(username, email, id, makeAxios, firebase)
		})
		.then(() => {
			dispatch({type: "GOOGLE_SUCCESS"})
		})
	}
}

export const passReset = (email) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().sendPasswordResetEmail(email)
		.then(response => {
			//console.log(response)
		})
	}
}