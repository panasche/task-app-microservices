import Task from '../models/task.model.js'
import {channel} from '../queue/connect.queue.js'

export async function createNewTask (req, res) {
    const {title, description, userId} = req.body
    try {
        const task = new Task({title, description, userId})
        await task.save()

        const message = { taskId: task._id, userId, title}
        if(!channel) {
            return res.status(503).json({error: "RabbitMQ not connected"})
        }
        channel.sendToQueue("task_created", Buffer.from(
            JSON.stringify(message)
        ))
            
        res.status(201).json(task)
    } catch(err) {
        console.error("Error saving user: ", err)
        res.status(500).json({err})
    }
}

export async function getTasks (req, res) {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        console.error("Error fetching users: ", err.message)
        res.status(500).json({err})
    }
}