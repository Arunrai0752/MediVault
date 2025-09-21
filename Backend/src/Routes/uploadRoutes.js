import express from "express";
import { saveTypedPrescription ,  uploadReports, uploadimageDoctor , uploadimagePatient } from "../Controllers/Reports&PrescriptoionController.js";
import multer from "multer";
import { ProtectDoctor , ProtectPatient } from "../Middlewares/authmiddleWare.js";


const upload = multer();
const router = express.Router();

router.post("/prescription/:id",ProtectDoctor, saveTypedPrescription);
router.post("/reports/:id",ProtectDoctor, upload.array("files"), uploadReports);
router.post("/profileD/:id",ProtectDoctor, upload.single("file"), uploadimageDoctor);
router.post("/profileP/:id",ProtectPatient, upload.single("file"), uploadimagePatient);


export default router;
