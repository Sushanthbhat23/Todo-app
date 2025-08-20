import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

//registering a new user
router.post('/register', (req, res) => {
    const {username, password} = req.body
    const hashPassword = bcrypt. hashSync(password, 8)

    //save the new user and password to the db
try {
    const insertUser = db.prepare(`INSERT INTO users(username, password) VALUES(?, ?)`)
    const result = insertUser.run(username, hashPassword)
    const defaultTodo = `Hello, this is your first todo!`
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, tasks)
        VALUES(?, ?)`)
    insertTodo.run(result.lastInsertRowid, defaultTodo)

    //create token
    const token = jwt.sign({id: result, lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
    res.json({ token })
} catch (err) {
    console.log(err.message)
    res.sendStatus(503)
}
})



router.post('/login', (req, res) => {
    const{username, password} = req.body
    try {
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
        const user = getUser.get(username)

        if(!user){
            return res.status(404).send({message: 'user not found'})
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if(!isPasswordValid){
            return res.status(401).send({message: 'incorrect password'})
        }

        //handling the request when the password is correct
        console.log(user)
        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
    
})

export default router