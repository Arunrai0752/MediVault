import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    fileUrl: { type: String, required: true }, // cloudinary URL
    notes: String,
}, { timestamps: true });

const Prescription = mongoose.model("Prescription", PrescriptionSchema);
export default Prescription;


