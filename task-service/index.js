import express from 'express'
import mongoose from 'mongoose'
import taskRoutes from './routes/task.routes.js'

const PORT = 3002

const app = express()
app.use(express.json())

mongoose.connect("mongodb://mongo:27017/users")
	.then(() => console.log("Task service connected to MongoDB"))
	.catch((err) => console.error("Task service connection to MongoDB failed: ", err))

app.use('/tasks', taskRoutes)

app.listen(PORT, () => {
	console.log(`Task service running on PORT ${PORT}`)
})