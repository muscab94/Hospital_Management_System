import express from 'express'
import { getSingleDoctor } from '../controllers/doctorController';


const doctor_router = express.Router();


doctor_router.get("/:id", getSingleDoctor)


export default doctor_router;




