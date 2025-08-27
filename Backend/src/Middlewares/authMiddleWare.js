import jwt from "jsonwebtoken"
import Doctor from "../Models/DoctorModel.js"
import Patient from "../Models/PatientsModel.js";

export const ProtectDoctor = async (req, res, next) => {

    try {

        

        const token =   req.headers.authorization?.split(' ')[1] ||  req.cookies.IDCard || "";
        if (!token) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            return next(error);
            
        }
        
        
        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        const verifiedDoctor = await Doctor.findById(decode.ID);

        if (!verifiedDoctor) {
            const error = new Error("Unauthorized !! Login Again");
            error.statusCode = 401;
            return next(error);

        }

        req.user = verifiedDoctor;
        next();

    } catch (error) {
        next(error)

    }


}


export const ProtectPatient = async (req, res, next) => {

    try {

        

        const token =   req.headers.authorization?.split(' ')[1] ||  req.cookies.IDCard || "";
        if (!token) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            return next(error);
            
        }
        
        
        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        const verifiedpatients = await Patient.findById(decode.ID);

        if (!verifiedpatients) {
            const error = new Error("Unauthorized !! Login Again");
            error.statusCode = 401;
            return next(error);

        }

        req.user = verifiedpatients;
        next();

    } catch (error) {
        next(error)

    }


}