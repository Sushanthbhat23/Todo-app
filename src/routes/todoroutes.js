import express from 'express'
import db from '../db.js'

const router = express.Router()

//get all todos from logged in user
router.post('/', (req,res) => {})

//create a new todo
router.post('/', (req, res) => {})

//update a new todo
router.put('/:id', (req, res) => {})

//delete a todo
router.delete('/:id', (req, res) => {})

export default router