
const initState = {authError: null}
const authReducer = (state=initState, action) => {
	switch (action.type){
		case "SIGNUP_SUCCESS":
			return {...state, authError: null}
		case "LOGIN_SUCCESS":
			console.log('login success');
			return {...state, authError: null}
		case "LOGIN_ERROR":
			return {...state, authError: 'Login Failed'}
		case "SIGNUP_ERROR":
			return {...state, authError: action.err}
		case "FACEBOOK_SUCCESS":
			return {...state, authError: null}
		case "TWITTER_SUCCESS":
			return {...state, authError: null}
		case "GOOGLE_SUCCESS":
			return {...state, authError: null}
		case "GITHUB_SUCCESS":
			return {...state, authError: null}
		default: 
			return state
	}
}

export default authReducer;