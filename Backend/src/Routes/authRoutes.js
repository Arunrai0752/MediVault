import express from "express";
import { DocRegister , DoctorLogin ,PatientLogin, PetientRegister ,UpdatePatients ,UpdateDoctors } from "../Controllers/authController.js";


const router = express.Router();

router.post("/register" , DocRegister  ) 
router.post("/loginD" , DoctorLogin  ) 
router.post("/loginP" , PatientLogin  ) 
router.post("/pregister" , PetientRegister  ) 
router.put("/update/:Pid" , UpdatePatients  ) 
router.put("/Dupdate/:Did" , UpdateDoctors  ) 


export default router;