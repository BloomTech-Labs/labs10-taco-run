const express = require('express');
const router = express.Router();
const knex = require("knex")
const dbConfig = require('../knexfile')
const db = require("../config.js")

//Create
//create a new comment
//-------------------------------------------
router.post('', (req, res) => {
	const {content, date, author, event_id } = req.body;

	db.insert({content, date, author, event_id }).into('comments')
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: "there was an error creating project"})
		})

})

// Delete
// delete a comment
// -------------------------------------------
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('projects')
	.where({id})
	.del()
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})


module.exports = router;
