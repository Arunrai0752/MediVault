import express from "express";
import { ProtectDoctor, ProtectPatient } from "../Middlewares/authmiddleWare.js"
import {SetAppointments , PatientAppoinmentss , DoctorAppoinmentss} from "../Controllers/AppoinmentsController.js";



const router = express.Router();


router.post("/appoinment", ProtectDoctor, SetAppointments   )
router.get("/appointments/:id", ProtectPatient , PatientAppoinmentss)
router.get("/Doctorappointments/:id", ProtectDoctor , DoctorAppoinmentss)

export default router;