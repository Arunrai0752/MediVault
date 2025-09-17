import express from "express";
import { saveTypedPrescription ,  uploadReports } from "../Controllers/Reports&PrescriptoionController.js";
import multer from "multer";
import { ProtectDoctor } from "../Middlewares/authmiddleWare.js";


const upload = multer();
const router = express.Router();

router.post("/prescription/:id",ProtectDoctor, saveTypedPrescription);
router.post("/reports/:id",ProtectDoctor, upload.array("files"), uploadReports);

export default router;
