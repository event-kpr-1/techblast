import express from 'express'
import {downloadXls} from '../controllers/xls_controller.js'




const router = express.Router();


// Route for downloading the XLSX file
router.get('/xlsx/:filename', downloadXls);


export default router;
