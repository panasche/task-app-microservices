import User from '../models/user.js'

export async function createNewUser (req, res) {
    const {name, email} = req.body
    try {
        const user = new User({name, email})
        await user.save()
        res.status(201).json(user)
    } catch(err) {
        console.error("Error saving user: ", err)
        res.status(500).json({err})
    }
}

export async function getAllUsers (req, res) {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.error("Error fetching users: ", err.message)
        res.status(500).json({err})
    }
}