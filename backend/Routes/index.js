import express from 'express'
const router = express.Router()
import { savedata,getdata } from '../controller/salesController.js'


router.post('/api/savedata',savedata)
router.get('/api/getdata',getdata)

export default router