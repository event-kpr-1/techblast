import express from 'express';
import eventProtection from '../middleware/eventProtection_Route.js';
import { register , regShow } from '../controllers/register_controller.js';

const router = express.Router();

router.post("/:evid/register",eventProtection,register);
router.get("/:evid/show/:regno",eventProtection,regShow);


export default router;