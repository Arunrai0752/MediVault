import Appointment from "../Models/AppoinmentModel.js";
import Doctor from "../Models/DoctorModel.js";
import Patient from "../Models/PatientsModel.js";



export const SetAppointments = async (req, res, next) => {
    try {
        const {
            phoneNumber,
            date,
            time,
            appointmentType,
            reason,
            insuranceProvider,
            insuranceId,
            previousVisit,
            referredBy,
            doctorId,
        } = req.body;

        if (!phoneNumber || !date || !time || !appointmentType || !reason || !previousVisit || !doctorId) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            throw error;
        }

        const patient = await Patient.findOne({ phone: phoneNumber });

        if (!patient) {
            const error = new Error("Patient not found with the provided phone number");
            error.statusCode = 404;
            throw error;
        }

        // Verify doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            const error = new Error("Doctor not found");
            error.statusCode = 404;
            throw error;
        }

        const newAppointment = Appointment.create({
            date,
            time,
            appointmentType,
            reason,
            insuranceProvider: insuranceProvider || "N/A",
            insuranceId: insuranceId || "N/A",
            previousVisit,
            referredBy: referredBy || "Self",
            patientId: patient._id,
            doctorId,
            patientName: patient.fullName,
            phoneNumber: patient.phone,
            email: patient.email,
            gender: patient.gender,
            dateOfBirth: patient.dob,
            address: patient.address
        });


        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: newAppointment
        });

    } catch (error) {
        next(error);
    }
};


export const PatientAppoinmentss = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            const error = new Error("Login Again");
            error.statusCode = 404;
            throw error;
        }

        const appointments = await Appointment.find({ patientId: id });

        

        res.status(200).json({
            success: true,
            data: appointments,
            message: "Patient All Appoinment get"
        });

    } catch (error) {
        next(error);
    }
};



export const DoctorAppoinmentss = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            const error = new Error("Login Again");
            error.statusCode = 404;
            throw error;
        }


        const appointments = await Appointment.find({ doctorId: id });

        console.log(appointments);
        

        

        res.status(200).json({
            success: true,
            data: appointments,
            message: "Patient All Appoinment get"
        });

    } catch (error) {
        next(error);
    }
};

