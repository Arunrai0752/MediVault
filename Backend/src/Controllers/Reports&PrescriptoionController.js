import Reports from "../Models/Reports.js";
import Prescription from "../Models/Prescription.js";
import cloudinary from "../Configs/cloudinary.js";

export const uploadPrescriptionn = async (req, res, next) => {
  const patientId = req.params.id;
  const doctorId = req.user?._id; // doctor login se aa raha hoga

  try {
      if (!req.file) {
          console.log("Doctor: 0932");
          return res.status(400).json({ message: "No file uploaded" });
        }
        
    const fileBase64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "MedicalDoc/Prescriptions",
      resource_type: "auto",
    });

    const newPrescription =  Prescription.create({
      patientId,
      doctorId,
      fileUrl: result.secure_url,
      notes: req.body.notes || "",
    });

   

    res.status(200).json({
      message: "Prescription uploaded & saved successfully",
      data: newPrescription,
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};




export const uploadReports = async (req, res, next) => {
  const patientId = req.params.id;
  const doctorId = req.user?._id;

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    console.log(2);
    
    
    const uploadPromises = req.files.map(async (file) => {
      const fileBase64 = file.buffer.toString("base64");
      const dataURI = `data:${file.mimetype};base64,${fileBase64}`;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "MedicalDoc/Reports",
        resource_type: "auto",
      });
      console.log(3);

      return Reports.create({
        patientId,
        doctorId,
        fileUrl: result.secure_url,
        reportType: req.body.type || "N/A",
      });
    });

    const newReports = await Promise.all(uploadPromises);

    res.status(200).json({
      message: "Reports uploaded & saved successfully ✅",
      data: newReports,
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({
      message: "Upload failed ❌",
      error: error.message,
    });
  }
};
