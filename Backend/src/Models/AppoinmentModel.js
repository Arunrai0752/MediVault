import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true,
    default: () =>
      `APPT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
  },

  date: { type: Date, required: true },
  time: { type: String, required: true },

  appointmentType : {
    type: String,
    enum: [
      "Consultation", "Follow-up", "Check-up", "Emergency",
      "Vaccination", "Test", "Procedure", "Surgery"
    ],
    default: "Consultation",
  },

  reason : { type: String, required: true },

  status: {
    type: String,
    enum: [
      "Scheduled", "Confirmed", "In Progress",
      "Completed", "Cancelled", "No Show", "Rescheduled"
    ],
    default: "Scheduled",
  },

  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },

  patientName : { type: String, required: true },
  previousVisit : { type: String, required: true },
  phoneNumber : { type: String, required: true, match: /^[0-9]{10}$/ },
  email : { type: String, match: /.+\@.+\..+/ },
  gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"] },
  dateOfBirth : { type: Date },
  address: { type: String, required: true },
  referredBy  : { type: String, required: true },
  insuranceProvider : { type: String, required: true },
  insuranceId : { type: String, required: true },


  cancelledBy: { type: String, enum: ["Patient", "Doctor", "Clinic"], default: null },
  cancellationReason: { type: String },
  cancellationTime: { type: Date },

  rescheduledFrom: {
    appointmentId: { type: String },
    date: { type: Date },
    time: { type: String },
  },

  confirmedAt: { type: Date },
  completedAt: { type: Date },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
