import about from "../assets/about-bg.jpg";
import author from "../assets/author-image.jpg";
import { motion } from "framer-motion";

function SectionTwo() {
  return (
    <section className="w-full h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Left side - Text */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 py-16"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <h2 className="text-4xl text-blue-700 tracking-wide md:text-5xl font-bold mb-6">
          Welcome to Your Health Center
        </h2>
        <p className="text-gray-600 mb-4">
          Aenean luctus lobortis tellus, vel ornare enim molestie condimentum.
          Curabitur lacinia nisi vitae velit volutpat venenatis.
        </p>
        <p className="text-gray-600 mb-6">
          Sed a dignissim lacus. Quisque fermentum est non orci commodo, a luctus
          urna mattis. Ut placerat, diam a tempus vehicula.
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 mt-4">
          <img
            src={author}
            alt="Dr. Neil Jackson"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-blue-700">Dr. Neil Jackson</h3>
            <p className="text-gray-500 text-sm">General Principal</p>
          </div>
        </div>
      </motion.div>

      {/* Right side - Background image */}
      <motion.div
        className="w-full md:w-1/2 h-[300px] md:h-full bg-cover bg-right"
        style={{ backgroundImage: `url(${about})` }}
        initial={{ opacity: 0, y: 100 }} // <-- changed from x:100 to y:50
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2, ease: "easeOut" }}
      ></motion.div>
    </section>
  );
}

export default SectionTwo;
