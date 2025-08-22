import jwt from "jsonwebtoken"
import Doctor from "../Models/DoctorModel.js"

export const Protect = async (req, res, next) => {

    try {

        const token =   req.headers.authorization?.split(' ')[1] ||  req.cookies.IDCard || "";

        if (!token) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            return next(error);

        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        const verifiedDoctor = await Doctor.findById(decode.ID);
        console.log(verifiedDoctor);

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