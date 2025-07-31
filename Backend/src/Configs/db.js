import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully");

    } catch (error) {
        console.error(" MongoDB Connection Error:", error.message);
        process.exit(1);

    }


}

export default ConnectDB;