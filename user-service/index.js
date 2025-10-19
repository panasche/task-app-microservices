import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js'

const PORT = 3001

const app = express()
app.use(express.json())

mongoose.connect('mongodb://mongo:27017/users')
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("Connection to MongoDB failed: ", err))

app.use('/users', userRoutes)

app.listen(PORT, () => {
	console.log(`User service listening on PORT ${PORT}`)
})