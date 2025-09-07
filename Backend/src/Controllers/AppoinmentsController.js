import Appointment from "../Models/AppoinmentModel.js";
import Doctor from "../Models/DoctorModel.js";
import Patient from "../Models/PatientsModel.js";
import Report from "../Models/Reports.js";




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
            address: patient.address,
            status: "Scheduled",
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

    const appointments = await Appointment.find({ patientId: id })
      .populate("doctorId", "fullName specialization email phone fee hospital");

clearImmediate      

    res.status(200).json({
      success: true,
      data: appointments,
      message: "Patient All Appointment fetched successfully"
    });

  } catch (error) {
    next(error);
  }
};


export const PatientReports = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      const error = new Error("Login Again");
      error.statusCode = 404;
      throw error;
    }

    const Reports = await Report.find({ patientId: id })
      .populate("doctorId", "fullName specialization email phone fee hospital");

      

    res.status(200).json({
      success: true,
      data: Reports,
      message: "Patient All Appointment fetched successfully"
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





        res.status(200).json({
            success: true,
            data: appointments,
            message: "Patient All Appoinment get"
        });

    } catch (error) {
        next(error);
    }
};




export const ReqAppointment = async (req, res, next) => {
    try {
        const id = req.params.id;

        const { doctor, specialty, reason, preferredDate, preferredTime, urgency } = req.body;

        if (!doctor || !reason || !preferredDate || !preferredTime) {
            const error = new Error("Doctor, reason, preferred date and time are required");
            error.statusCode = 400;
            throw error;
        }

        const doctorData = await Doctor.findOne({ phone: doctor });
        const patientData = await Patient.findById(id);

        if (!doctorData) {
            const error = new Error("Doctor not found with the provided phone number");
            error.statusCode = 404;
            throw error;
        }

        if (!patientData) {
            const error = new Error("Patient not found");
            error.statusCode = 404;
            throw error;
        }




        const appointmentRequest = await Appointment.create({
            date: preferredDate,
            time: preferredTime,
            appointmentType: "Consultation",
            reason,
            status: "Requested",
            patientId: patientData._id,
            doctorId: doctorData._id,
            patientName: patientData.fullName,
            phoneNumber: patientData.phone,
            email: patientData.email,
            gender: patientData.gender,
            dateOfBirth: patientData.dob,
            address: patientData.address,
            urgency: urgency || "Normal",
            specialty: specialty || doctorData.specialty,
            previousVisit: "No"
        });

        res.status(201).json({
            success: true,
            message: "Appointment request sent successfully. Waiting for doctor confirmation.",
            data: appointmentRequest
        });

    } catch (error) {
        next(error);
    }
};




export const updateAppointmentStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;


        if (!id || !status) {
            return res.status(400).json({ message: "Appointment ID and status required" });
        }

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }



        appointment.status = status;
        await appointment.save();

        res.status(200).json({
            message: "Appointment status updated successfully",
            data: appointment,
        });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




export const updateAppointmentNotes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;


        if (!id || !notes) {
            return res.status(400).json({ message: "Appointment ID and status required" });
        }

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }



        appointment.notes = notes;

        await appointment.save();

        res.status(200).json({
            message: "Appointment Notes updated successfully",
            data: appointment,
        });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};





export const rescheduleAppoinment = async (req, res, next) => {
  try {
    const id = req.params.id;

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

    if (!id) {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
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
        status: "Rescheduled",
      },
      { new: true } 
    );

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment rescheduled successfully",
      data: updatedAppointment,
    });

  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
