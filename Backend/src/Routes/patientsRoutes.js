import express from "express";
import { PatientLogin, PetientRegister ,UpdatePatients } from "../Controllers/authController.js";
import { ProtectPatient } from "../Middlewares/authmiddleWare.js";

const router = express.Router();


router.post("/login" , PatientLogin  ) 
router.post("/pregister" , PetientRegister  ) 
router.put("/update/:Pid" , ProtectPatient , UpdatePatients  ) 
router.get("/get/:Did" , UpdatePatients  ) 


export default router;