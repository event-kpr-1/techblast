import express from 'express'

// controllers
import {printid , printcertificate , getEvent} from '../controllers/provider_controller.js'
import eventProtection from '../middleware/eventProtection_Route.js';


const router = express.Router();


router.get("/:evid/printid/:regno", eventProtection , printid)
router.get("/:evid/event", eventProtection , getEvent)
// router.get("/printcertificate/:regno",printcertificate)


export default router;