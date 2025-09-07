import express from "express";
import { DocRegister   , DoctorLogin,UpdateDoctors, FetchAllAppointments , FetchAllReports, GetPatientDetail } from "../Controllers/authController.js";
import { ProtectDoctor  } from "../Middlewares/authmiddleWare.js";


const router = express.Router();


router.post("/register", DocRegister)
router.post("/login", DoctorLogin)
router.put("/update/:Did", ProtectDoctor ,   UpdateDoctors) 
router.get("/patient/:id" , ProtectDoctor , GetPatientDetail)
router.get("/PatientAppointments/:id" , FetchAllAppointments );
router.get("/PatientReports/:id" , FetchAllReports );



export default router;
