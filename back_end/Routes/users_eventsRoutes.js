const express = require('express');
const router = express.Router();
const db = require('../config.js')

//CREATE
//user signs up to go to an event
//post http://localhost:5555/users_events
//-------------------------------------------
router.post('', (req, res) => {

	//would have to pass this is fron the front end
	const {user_id, event_id} = req.body

	//check is user is already going to event
	db('users_events')
	.where({user_id, event_id})
	.then(response => {

		// if user attemps to sign up for event he is already going to
		if (response.length > 0){
			return res.status(200).json({msg: 'you are aleady going to this event'})
		} else {
			//user adds event since he is not yet going to event
			db.insert({user_id, event_id}).into('users_events')
			.then(response => {
				
				/*
					find the current number of people attending the event
					and add 1 to it, because now one more person is going
				*/
				
				db('events')
					.where({id: event_id})
					.first()
					.then(res2 => {
						let attending = res2.total_users
						attending = attending + 1

						//update the new amount
						db('events')
							.where({id: event_id})
							.update({total_users: attending })
							.then(res3 => {
								return res.status(200).json(res3)
							})
					})
			})
			//catch error for adding event
			.catch(error => {
				return res.status(500).json(error)
			})
		}
	})
	//catch error for looking up if user is going to event
	.catch(error => {
		return res.status(500).json(error)
	})
})

//READ
//get all events from a user
//get http://localhost:5555/users_events/:id
//this will allow us to get all the data from each event the user is going to and possibly display it on the front end.
//-------------------------------------------

router.get('/:id', (req, res) => {
	const { id } = req.params;

	db('users_events')
	.join('events', 'events.id', '=', 'users_events.event_id')
	.where("users_events.user_id", id)
	.then(response => {

		let current = new Date().toLocaleString();
		let today = new Date(current)

		let past = []
		let upcoming = []

		for (let i = 0; i < response.length; i++ ) {
			event_date = new Date(response[i].date)
			if (event_date > today){
			  upcoming.push(response[i])
			} else {
			  past.push(response[i])
			}
		}

		let events = {upcoming: upcoming, past: past}
		return res.status(200).json(events)
		
	})
	.catch(error => {
		console.log("Error Data:",error);
		return res.status(500).json(error);
	});
})

//DELETE
//delete user no longer going to event
//delete http://localhost:5555/users_events
//-------------------------------------------
router.delete('', (req, res) => {
	const {user_id, event_id} = req.body



	db('users_events')
	.where({user_id, event_id})
	.then(res0 => {

		// am I attending the event?
		if (res0.length === 0) {
			return res.status(200).json({msg: "you are not currently attending event"})
		} else {

			//if attending then delete from attending

			db('users_events')
			.where({user_id, event_id})
			.del()
			.then(() => {

				// now I look up the event and decrement the number of people attending by 1

				db('events')
				.where({id: event_id})
				.first()
				.then(res1 => {

					let attending = res1.total_users
					attending = attending - 1
					db('events')
					.where({id: event_id})
					.update({total_users: attending})
					.then(res2 => {
						return res.status(200).json(res2)
					})
				})
			})
		}
	})
})

module.exports = router;