import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true,
    default: () =>
      `APPT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
  },

  date: { type: Date,},
  time: { type: String,},




  appointmentType : {
    type: String,
    default: "Consultation",
  },




  reason : { type: String, required: true },




status: {
  type: String,
  enum: [
    "Requested", 
    "Scheduled", "Confirmed", "In Progress",
    "Completed", "Cancelled", "No Show", "Rescheduled"
  ],
  default: "Scheduled",
},



  patientId: { type: String , required: true },
  doctorId: { type: String , required: true },
  patientName : { type: String, required: true },
  previousVisit : { type: String,  },
  phoneNumber : { type: String, required: true, match: /^[0-9]{10}$/ },
  email : { type: String, match: /.+\@.+\..+/ },
  gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"] },
  dateOfBirth : { type: Date },
  address: { type: String, },
  referredBy  : { type: String,},
  insuranceProvider : { type: String,  },
  insuranceId : { type: String, },





  cancelledBy: { type: String, enum: ["Patient", "Doctor", "Clinic"], default: null },
  cancellationReason: { type: String },
  cancellationTime: { type: Date },
  rescheduledFrom: {
    appointmentId: { type: String },
    date: { type: Date },
    time: { type: String },
  },
  notes:{
    type: String
  },

  confirmedAt: { type: Date },
  completedAt: { type: Date },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
