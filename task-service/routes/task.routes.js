import express from 'express'
const router = express.Router()
import * as ctrl from '../controllers/task.controller.js'

router.get('/', ctrl.getTasks)

router.post('/', ctrl.createNewTask)

export default router