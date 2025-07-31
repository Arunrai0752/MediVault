import express from "express";
import { DocRegister , userLogin } from "../Controllers/authController.js";


const router = express.Router();

router.post("/register" , DocRegister  ) 
router.post("/login" , userLogin  ) 


export default router;