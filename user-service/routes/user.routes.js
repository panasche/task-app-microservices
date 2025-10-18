import express from 'express'
const router = express.Router()
import * as ctrl from '../controllers/users.controller.js'

router.get('/', ctrl.getAllUsers)

router.post('/', ctrl.createNewUser)

export default router