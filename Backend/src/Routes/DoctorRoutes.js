import express from "express";
import { DocRegister , DoctorLogin,UpdateDoctors } from "../Controllers/authController.js";
import { Protect } from "../Middlewares/authmiddleWare.js";


const router = express.Router();


router.post("/register", DocRegister)
router.post("/login", DoctorLogin)
router.put("/update/:Did", Protect ,   UpdateDoctors) 


export default router;
