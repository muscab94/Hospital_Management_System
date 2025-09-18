import news1 from "../assets/news-image1.jpg"
import news2 from "../assets/news-image2.jpg"
import news3 from "../assets/news-image3.jpg"
import { motion } from "framer-motion";

function SectionFour() {
  const newsData = [
    {
      date: "March 08, 2025",
      title: "About Amazing Technology",
      desc: "Maecenas risus neque, placerat volutpat tempor ut, vehicula et felis.",
      img: news1,
      author: "Jeremie Carlson",
      role: "CEO / Founder",
    },
    {
      date: "February 20, 2025",
      title: "Introducing a new healing process",
      desc: "Fusce vel sem finibus, rhoncus massa non, aliquam velit. Nam et est ligula.",
      img: news2,
      author: "Jason Stewart",
      role: "General Director",
    },
    {
      date: "January 23, 2025",
      title: "Review Annual Medical Research",
      desc: "Vivamus non nulla semper diam cursus maximus. Pellentesque dignissim.",
      img: news3,
      author: "Andrio Abero",
      role: "Online Advertising",
    },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-20 bg-gray-100">
      <h2 className="text-3xl text-blue-700 md:text-4xl font-bold text-center mb-12">
        Latest News
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {newsData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md w-72 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 100 }}         // Start hidden, below
            whileInView={{ opacity: 1, y: 0 }}       // Animate to visible
            transition={{ duration: 0.8, delay: index * 0.2 }} // Staggered
            viewport={{ once: true }}                // Run only once
          >
            {/* Image */}
            <img src={item.img} alt={item.title} className="w-full h-56 object-cover" />

            {/* Content */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t">
                <motion.img
                  src={item.img}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover"
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div>
                  <p className="text-sm text-blue-700 font-medium">{item.author}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default SectionFour;
