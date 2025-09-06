import express from "express";
import { uploadPrescriptionn ,  uploadReports } from "../Controllers/Reports&PrescriptoionController.js";
import multer from "multer";
import { ProtectDoctor } from "../Middlewares/authmiddleWare.js";


const upload = multer();
const router = express.Router();

router.post("/prescription/:id",ProtectDoctor, upload.single("file"), uploadPrescriptionn);
router.post("/reports/:id",ProtectDoctor, upload.array("files"), uploadReports);

export default router;
