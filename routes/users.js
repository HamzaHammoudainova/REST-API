const express = require('express')
const router = express.Router()
const User = require('../models/users')

//Getting all
router.get('/', async (req, res) => {
try {
    const users = await User.find()
    res.json(users)
} catch (err) {
    res.status(500).json({ message: err.message })
}
})

//Geting one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//creating one
router.post('/', async (req, res) => {
    const user = new User({
        name : req.body.name,
        subsribedToChannel : req.body.subsribedToChannel
    })
    try{
        const newUser = await user.save()
        res.status(201).json({newUser})
    }catch (err){
        res.status(400).json( { message: err.message } )
    }
})

//Updating One
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null){
        res.user.name = req.body.name
    }
    if (req.body.subsribedToChannel != null){
        res.user.subsribedToChannel = req.body.subsribedToChannel
    }
    try {
    const updateUser = await res.user.save()
    res.json(updateUser)
    }catch (err){
        res.status(400).json( { message: err.message } )
    }
})

//Deleting One
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.deleteOne()
        res.json({message: 'Deleted User'})
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})



// Middleware for ID

async function getUser  (req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json( { message: 'Cannot Find User' } )
        }
    }catch (err) {
        return res.status(500).json( { message: err.message } )
    }

    res.user = user
    next()
}




module.exports = router