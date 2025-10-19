import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Task', TaskSchema)