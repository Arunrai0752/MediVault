import React, { useEffect, useState } from "react";
import { FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../Configs/api";





const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Doctors = () => {

    const [allDoctors, setAllDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const filteredDoctors = allDoctors.filter((doctor) =>
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||   doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||  doctor.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const FetchAllDoctors = async () => {


        const res = await api.get("/doctors/FetchAll");
        setAllDoctors(res.data.data)
        console.log(res.data.data)


    }




    useEffect(() => {
        FetchAllDoctors()
    }, [])

    return (
        <main className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white py-16">
            <section className=" mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
                        Meet Our Doctors
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Find experienced and trusted healthcare professionals to take care of your health.
                    </p>
                </motion.div>

                <div className="mb-10 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by Specialization / Name / Number  "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md px-4 py-3 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className=" sm:grid-cols-2 lg:grid-cols-3 flex flex-wrap justify-center gap-8"
                >
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                            <motion.div
                                key={doctor._id}
                                variants={item}
                                className="bg-white rounded-2xl shadow-md p-6 border border-teal-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        src={doctor.photo}
                                        alt={doctor.fullName.charAt(0)}
                                        className="w-32 h-32 rounded-full text-9xl object-cover object-center mb-4 border-4 bg-green-400 border-teal-200"
                                    />
                                    <h3 className="text-xl font-semibold text-teal-700 mb-1">
                                        {doctor.fullName}
                                    </h3>
                                    <p className="text-gray-600 mb-1">{doctor.specialization}</p>
                                    <p className="text-gray-600 mb-1">
                                        Experience: {doctor.experience} years
                                    </p>
                                    <p className="text-gray-600 mb-4">{doctor.hospital||"N/A"}</p>
                                    <p className="text-teal-600 font-semibold mb-4">
                                        Consultation Fee: ₹{doctor.fee}
                                    </p>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => navigate("/register")}
                                            className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                                        >
                                            <FaUserMd className="mr-2" />
                                            Book Appointment
                                        </button>
                                        <button
                                            onClick={() => alert("View Profile feature coming soon!")}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">
                            No doctors found for "{searchTerm}"
                        </p>
                    )}
                </motion.div>
            </section>
        </main>
    );
};

export default Doctors;
