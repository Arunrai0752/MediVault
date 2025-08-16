import express from "express";

import { PatientLogin, PetientRegister ,UpdatePatients } from "../Controllers/authController.js";

const router = express.Router();


router.post("/login" , PatientLogin  ) 
router.post("/pregister" , PetientRegister  ) 
router.put("/update/:Pid" , UpdatePatients  ) 
router.get("/get/:Did" , UpdatePatients  ) 


export default router;