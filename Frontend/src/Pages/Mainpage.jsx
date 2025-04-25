import React from "react";
import background from "../assets/Homepage/15.jpg";
import scrollbackground from "../assets/Homepage/6.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Mainpage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden font-sans">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${background})` }}
        />

        {/* Overlay to highlight text */}
        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.2)] z-10" />

        {/* main hero stuff */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white px-4 text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-4"
          >
            Discover Nature Around You
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-lg md:text-2xl max-w-2xl mb-6 drop-shadow-md"
          >
            Capture wildlife, share your sightings, and explore a vibrant
            community of naturalists.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            onClick={() => navigate("/signup")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition"
          >
            Get Started
          </motion.button>
        </div>

        <div className="absolute bottom-4 right-4 text-xs text-white bg-black bg-opacity-50 px-3 py-1 rounded-md z-30 shadow-sm">
          © Mayur K Setty
        </div>

        {/* Scroll encourage */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 animate-bounce text-white text-sm opacity-75">
          ↓ Scroll to Explore
        </div>
      </div>

      {/* Scroll down Section */}
      <section
        className="relative h-screen w-full bg-fixed bg-center bg-cover flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url(${scrollbackground})`,
        }}
      >
        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.2)] z-0" />
        <div className="bg-black bg-opacity-60 p-8 rounded-xl max-w-2xl text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed"
          >
            TerraQuest empowers nature enthusiasts to document biodiversity,
            contribute to global conservation efforts, and foster a deeper
            connection with the natural world. Every observation brings us one
            step closer to protecting our planet.
          </motion.p>
        </div>
        <div className="absolute bottom-4 right-4 text-xs text-white bg-black bg-opacity-50 px-3 py-1 rounded-md z-30 shadow-sm">
          © Mayur K Setty
        </div>
      </section>
    </>
  );
}

export default Mainpage;
