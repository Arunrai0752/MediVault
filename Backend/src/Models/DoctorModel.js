import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },
    specialization: {
      type: String,
      required: true,
      enum: [
        "Cardiologist",
        "Neurologist",
        "Dermatologist",
        "ENT",
        "Orthopedic",
        "General Physician",
        "Pediatrician",
        "Psychiatrist",
        "Gynecologist",
        "Other",
      ],
      default: "General Physician",
    },
    experience: {
      type: Number,
      required: true,
      min: [0, "Experience must be a non-negative number"],
    },
    hospital: {
      type: String,
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    availability: {
      type: String,
    },
    photo: {
      type: String,
      default: "",
    },
    fee: {
      type: Number,
      default: 500,
      min: [0, "Fee must be a non-negative number"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Doctor",
    },
    // New fields added from frontend
    qualifications: {
      type: String,
      trim: true,
    },
    consultationHours: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    biography: {
      type: String,
      trim: true,
    },
    services: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    education: {
      type: [String],
      default: [],
    },
    // Additional metadata fields
    lastActive: {
      type: Date,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for better query performance
DoctorSchema.index({ email: 1 });
DoctorSchema.index({ licenseNumber: 1 });
DoctorSchema.index({ specialization: 1 });
DoctorSchema.index({ status: 1 });
DoctorSchema.index({ hospital: 1 });

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;