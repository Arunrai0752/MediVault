import Doctor from "../Models/DoctorModel.js"
import bcrypt from "bcrypt";
import Patient from "../Models/PatientsModel.js";
import gentoken from "../Utils/auth.js";
import Appointment from "../Models/AppoinmentModel.js"
import Report from "../Models/Reports.js";



export const DocRegister = async (req, res, next) => {
  try {

    const { fullName, email, phone, specialization, experience, licenseNumber, fee, password } = req.body;


    if (!fullName || !specialization || !email || !phone || !experience || !licenseNumber || !fee || !password) {
      const error = new Error("All Fields Requeried");
      error.statusCode = 400;
      return next(error);
    }


    const existingDoctor = await Doctor.findOne({ licenseNumber });

    if (existingDoctor && existingDoctor.status === "Active") {

      const error = new Error("Doctor is Already Registered");
      error.statusCode = 400;
      return next(error);
    }




    const hashedpass = await bcrypt.hash(password, 10);
    const profilePic = `https://placehold.co/600x400?text=${fullName
      .charAt(0)
      .toUpperCase()}`;



    let newDoctor = "";

    if (existingDoctor && existingDoctor.status === "Inactive") {
      existingDoctor.fullName = fullName;
      existingDoctor.specialization = specialization;
      existingDoctor.password = hashedpass;
      existingDoctor.status = "Active";
      existingDoctor.phone = phone;
      existingDoctor.licenseNumber = licenseNumber;
      existingDoctor.fee = fee;
      await existingDoctor.save();

    }
    else {
      newDoctor = await Doctor.create({
        fullName,
        email,
        specialization,
        phone,
        password: hashedpass,
        experience: experience,
        licenseNumber: licenseNumber,
        fee: fee,
        role: "Doctor",
        experience: experience,
      });
    }

    res.status(200).json({ message: "Dostor Register Successfully", Data: newDoctor })



  } catch (error) {

    res.status(404).json({ message: "Dostor Register failed" })
    next(error);
  }
}


export const DoctorLogin = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Fields Required");
      error.statusCode = 409;
      return next(error);
    }


    const user = await Doctor.findOne({ email });
    if (!user) {
      const error = new Error("User Not registered");
      error.statusCode = 408;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, user.password);


    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }



    gentoken(user._id, res);


    res.status(200).json({
      message: `WelcomeBack ${user.fullName} `,
      data: user,
    });


  } catch (error) {

    next(error);

  }
}


export const PetientRegister = async (req, res, next) => {

  try {

    const { fullName, aadharNumber, email, dob, password } = req.body;

    console.log({ fullName, aadharNumber, email, dob, password });



    if (!fullName || !email || !aadharNumber || !dob || !password) {
      const error = new Error("All Fields Requeried");
      error.statusCode = 400;
      return next(error);
    }



    const existingpatients = await Patient.findOne({ aadharNumber });


    if (existingpatients) {
      return res.status(409).json({ message: "Patient is already registered with this Aadhaar." });
    }



    const hassPassword = await bcrypt.hash(password, 10);

    const newPatient = await Patient.create({

      fullName,
      aadharNumber,
      email,
      dob,
      password: hassPassword,
      role: "Patient",

    })




    res.status(200).json({ message: "Patients Registered Succesfuly", data: newPatient });
  } catch (error) {


    console.error("Patient registration error:", error);
    res.status(500).json({ message: "Patient registration failed", error: error.message });

  }

}


export const PatientLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await Patient.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error("Patient not registered");
      error.statusCode = 404;
      return next(error);
    }

    if (!user.password) {
      const error = new Error("Authentication error - no password set");
      error.statusCode = 500;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401
      return next(error);
    }

    user.password = undefined;


    gentoken(user._id, res);

    res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullName}`,
      data: user
    });

  } catch (error) {
    console.error("Login error:", error);

    if (error.message.includes("data and hash arguments required")) {
      error.message = "Authentication error - invalid password comparison";
      error.statusCode = 500;
    }

    next(error);
  }
};


export const UpdatePatients = async (req, res, next) => {
  try {
    const id = req.params.Pid;

    if (!id) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const oldData = await Patient.findById(id);

    if (!oldData) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const formattedDob = req.body.dob || oldData.dob;
    const formattedLastCheckup = req.body.lastCheckup || oldData.lastCheckup;

    const updatedFields = {
      fullName: req.body.fullName || oldData.fullName,
      gender: req.body.gender || oldData.gender || "Prefer not to say",
      dob: formattedDob,
      email: req.body.email || oldData.email,
      phone: req.body.phone || oldData.phone,
      address: req.body.address || oldData.address,
      aadharNumber: req.body.aadharNumber || oldData.aadharNumber,
      bloodGroup: req.body.bloodGroup || oldData.bloodGroup || "Unknown",
      role: req.body.role || oldData.role || "Patient",
      age: req.body.age || oldData.age,
      height: req.body.height || oldData.height,
      weight: req.body.weight || oldData.weight,

      emergencyContacts: Array.isArray(req.body.emergencyContacts)
        ? req.body.emergencyContacts
        : oldData.emergencyContacts,

      allergies: Array.isArray(req.body.allergies)
        ? req.body.allergies
        : oldData.allergies,

      conditions: Array.isArray(req.body.conditions)
        ? req.body.conditions
        : oldData.conditions,

      lastCheckup: formattedLastCheckup,
    };


    const updatedUser = await Patient.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      message: "Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};












export const UpdateDoctors = async (req, res, next) => {
  try {
    const {
      fullName,
      phone,
      specialization,
      experience,
      hospital,
      availability,
      fee,
      status,
      qualifications,
      consultationHours,
      emergencyContact,
      department,
      biography,
      services,
      languages,
      education
    } = req.body;

    const id = req.params.Did;

    if (!id) {
      const error = new Error("Doctor Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const protectedFields = ['email', 'licenseNumber', 'password', 'isVerified', 'role'];

    const updateData = {
      fullName,
      phone,
      specialization,
      experience,
      hospital,
      availability,
      fee,
      status,
      qualifications,
      consultationHours,
      emergencyContact,
      department,
      biography,
      services: Array.isArray(services) ? services : [],
      languages: Array.isArray(languages) ? languages : [],
      education: Array.isArray(education) ? education : [],
      updatedAt: new Date()
    };

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedUser = await Doctor.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
      }
    ).select('-password');

    if (!updatedUser) {
      const error = new Error("Doctor not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(error.errors).map(val => val.message).join(', ');
    }
    next(error);
  }
};


export const GetPatientDetail = async (req, res, next) => {

  try {

    const id = req.params.id;

    if (!id) {
      const error = new Error("Patient ID not Found")
      error.statusCode = 404;
      next(error)
    }

    const patient = await Patient.findOne({ phone: id })

    if (!patient) {
      const error = new Error("Patient not Found")
      error.statusCode = 404;
      next(error)

    }

    console.log(patient);

    res.status(200).json({
      message: "Patient Found Successfully",
      data: patient
    })


  } catch (error) {
    next(error)

  }


}

export const FetchAllAppointments = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(id);

    const appointments = await Appointment.find({ patientId: id }).populate("doctorId", "fullName specialization email");


    if (!appointments || appointments.length === 0) {
      return res.status(404).json({
        message: "No appointments found for this patient",
        data: [],
      });
    }


    res.status(200).json({
      message: "Appointments fetched successfully",
      data: appointments,
    });

  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    next(error);
  }
};



export const FetchAllReports = async (req, res, next) => {
  try {
    const { id } = req.params;


    const Reports = await Report.find({ patientId: id }).populate("doctorId", "fullName specialization email");



    if (!Reports || Reports.length === 0) {
      return res.status(404).json({
        message: "No Reports found for this patient",
        data: [],
      });
    }


    res.status(200).json({
      message: "Reports fetched successfully",
      data: Reports,
    });

  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    next(error);
  }
};
