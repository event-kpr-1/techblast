import express from 'express'

// controllers
import {attended , validEvent} from '../controllers/attendance_controller.js'
import eventProtection from '../middleware/eventProtection_Route.js'

const router = express.Router();

router.post("/:evid/:event/:id" ,eventProtection, attended)
router.get("/:evid",eventProtection,validEvent)


export default router;