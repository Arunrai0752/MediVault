import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Player
        autoplay
        loop
        src="https://assets3.lottiefiles.com/packages/lf20_tutvdkg0.json" 
        style={{ height: "200px", width: "200px" }}
      />
      <p className="mt-6 text-blue-700 text-3xl font-semibold">
       Loading...
      </p>
    </motion.div>
  );
}
