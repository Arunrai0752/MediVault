import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true,
    default: () => `APPT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled", "Completed"],
    default: "Pending",
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientPhone: {
    type: String,
    required: true,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialization: {
    type: String,
    required: true,
  },

  // Doctor's Prescription Section (Replaces 'notes')
  prescription: {
    notes: {
      type: String,
      default: "",
    },
    attachments: [
      {
        fileType: {
          type: String,
          enum: ["image", "pdf", "document"],
        },
        url: String, // Cloudinary/S3 URL
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update 'updatedAt' on every save
appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;