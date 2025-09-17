import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medicines: [
    {
      name: { type: String, required: true },
      dose: { type: String, required: true },     
      duration: { type: String, required: true }, 
    },
  ],
  notes: {
    type: String,
  },
  nextVisit: {
    type: Date,
  },
  fileUrl: {
    type: String, // optional if you later upload a generated PDF to Cloudinary
  },
  date: {
    type: Date,
   
  },
}, { timestamps: true });

const Prescription = mongoose.model("Prescription", PrescriptionSchema);
export default Prescription;
