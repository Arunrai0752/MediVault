import mongoose from "mongoose";

const DoctorSchema =  mongoose.Schema(
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
            match: [/^\d{10}$/, "Phone must be 10 digits"], // Indian format
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
        role:{
            type:String,
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
