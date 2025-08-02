import mongoose from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"]
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
    default: "Prefer not to say"
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
    validate: {
      validator: function(dob) {
        return dob < new Date();
      },
      message: "Date of birth must be in the past"
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  phone: {
    type: String,
    default: "N/A"
  },
  address: {
    type: String,
    default: "N/A",
    maxlength: [500, "Address cannot exceed 500 characters"]
  },
  aadharNumber: {
    type: String,
    required: [true, 'Aadhaar number is required'],
    unique: true,
    match: [/^[0-9]{12}$/, "Please enter a valid 12-digit Aadhaar number"]
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
    default: "Unknown"
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["Patient", "Admin", "Doctor"],
    default: "Patient"
  }
}, { 
  timestamps: true,

});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
