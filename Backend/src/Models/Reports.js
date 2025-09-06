import mongoose from "mongoose";

const ReportSchema =  mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    fileUrl: { type: String, required: true },
    reportType: {type: String }
}, { timestamps: true });

const Report = mongoose.model("report" , ReportSchema);
export default Report;



