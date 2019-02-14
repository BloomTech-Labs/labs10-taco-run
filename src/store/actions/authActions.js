export const signIn = (creds) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().signInWithEmailAndPassword(
			creds.email,
			creds.password
		).then(response => {
			console.log(response)
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
			console.log(response);
			return firebase.database().ref(`users/${response.user.uid}`).set({
				username: user.username, email: user.email
			})
		})
		.then(() => {
			dispatch({type: "SIGNUP_SUCCESS"})
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
			console.log(response)
			return firebase.database().ref(`users/${id}`).set({
				username: username, email: email
			})
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
			console.log(response)
			return firebase.database().ref(`users/${id}`).set({
				username: username, email: email
			})
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
			console.log(response)
			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			let id = response.additionalUserInfo.profile.id
			return firebase.database().ref(`users/${id}`).set({
				username: username, email: email
			})
		})
		.then(() => {
			dispatch({type: "GOOGLE_SUCCESS"})
		})
	}
}

export const githubAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.GithubAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(response => {
			console.log(response)
			let username = response.additionalUserInfo.profile.name
			let email = response.additionalUserInfo.profile.email
			let id = response.additionalUserInfo.profile.id
			return firebase.database().ref(`users/${id}`).set({
				username: username, email: email
			})
		})
		.then(() => {
			dispatch({type: "GITHUB_SUCCESS"})
		})
	}
}

export const passReset = (email) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().sendPasswordResetEmail(email)
		.then(response => {
			console.log(response)
		})
	}
}