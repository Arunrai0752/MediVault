import express from 'express'
import ConnectDB from './src/Configs/db.js';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from "cookie-parser";
import patientsRoute from "./src/Routes/patientsRoutes.js"
import DoctorRoutes from "./src/Routes/DoctorRoutes.js"

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT || 2022 ;

app.use(express.json());
app.use(cookieParser());





app.use("/doctors", DoctorRoutes )
app.use("/patients", patientsRoute )


app.get('/', (req, res) => {
    res.send('Hello from backend!');
});


app.listen(PORT,async () =>  {

    console.log(`Server is running on http://localhost:${PORT}`);
    await ConnectDB();
});
