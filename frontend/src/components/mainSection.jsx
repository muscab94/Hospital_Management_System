import image1 from "../assets/slider3.jpg";
import { motion } from "framer-motion";
import SectionTwo from "./sectionTwo";
import SectionThree from "./sectionThree";
import SectionFour from "./sectionFour";
import Appointments from "../pages/Appointments";
import SectionAppointment from "./Appointment";
import SectionDepartment from "./SectionDepartment";
import SectionDoctors from "./SectionDoctors";
import Testimonials from "./Testinomial";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import Team from "./team";

function MainSection() {
  const title = "Your Health Benefits";

  return ( <div>
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${image1})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <p className="uppercase tracking-widest text-sm mb-2">
          Pellentesque nec libero nisi
        </p>

        {/* Animated Title */}
        <div className="overflow-hidden whitespace-nowrap">
          <motion.h1
            className="text-4xl md:text-6xl font-bold inline-block"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
              },
            }}
          >
            {title.split("").map((letter, index) => (
              <span key={index} className="inline-block mr-1">
                {letter}
              </span>
            ))}
          </motion.h1>
        </div>

        <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-medium">
          Read stories
        </button>
      </div>
    </div>
         <SectionTwo/>
       <SectionThree/>
       <SectionFour/>
       {/* <SectionAppointment/> */}
       <SectionDepartment/>
       <SectionDoctors/>
       <Testimonials/>
       {/* <Team/> */}
       {/* <ContactForm/> */}
       {/* <Footer/> */}
    </div>
  );
}

export default MainSection;
