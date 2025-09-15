import express from "express";
import { ProtectDoctor, ProtectPatient } from "../Middlewares/authmiddleWare.js"
import { SetAppointments, PatientAppoinmentss, PatientPrescriptions ,PatientReports ,DoctorAppoinmentss,rescheduleAppoinment, ReqAppointment, updateAppointmentStatus, updateAppointmentNotes } from "../Controllers/AppoinmentsController.js";



const router = express.Router();


router.post("/appoinment", ProtectDoctor, SetAppointments)
router.get("/reports/:id", ProtectPatient, PatientReports)
router.get("/prescriptions/:id", ProtectPatient, PatientPrescriptions)
router.post("/requestAppoinment/:id", ProtectPatient, ReqAppointment)
router.get("/appointments/:id", ProtectPatient, PatientAppoinmentss)
router.get("/Doctorappointments/:id", ProtectDoctor, DoctorAppoinmentss)
router.put("/appointments/:id/status", updateAppointmentStatus);
router.put("/appointments/:id/notes", updateAppointmentNotes);
router.put("/appointments/:id/reschedule", rescheduleAppoinment);
export default router;



