import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer.js';
import config from './firebase.js'

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux';

const store = createStore(rootReducer, 
	compose(
		applyMiddleware(
			thunk.withExtraArgument({getFirebase})
		),
		reactReduxFirebase(config, { useFirebaseForProfile: true, userProfile: 'users', attachAuthIsReady: true })
	)
)
store.firebaseAuthIsReady.then(() => {
   ReactDOM.render(
	   <Provider store={store}><Router><App /></Router></Provider>
	   , document.getElementById('root'));
});
