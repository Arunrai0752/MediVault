import Doctor from "../Models/DoctorModel.js"
import bcrypt from "bcrypt";


export const DocRegister = async (req, res, next) => {
  try {

    const { fullName, email, phone, specialization, experience, licenseNumber, fee, password } = req.body;

    console.log({ fullName, email, phone, specialization, experience, licenseNumber, fee, password });


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
        role:"Doctor",
        experience: experience,
      });
    }

    res.status(200).json({ message: "Dostor Register Successfully", Data: newDoctor })



  } catch (error) {

      res.status(404).json({ message: "Dostor Register failed" })
    next(error);
  }
}


export const userLogin = async ( req , res , next) => {
try {
  
  const {email , password} = req.body;

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

  res.status(200).json({
      message: `WelcomeBack ${user.fullName} `,
      data: user,
    });


} catch (error) {

   next(error);
  
}
  } 



