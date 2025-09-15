import { FaFlask, FaHospital, FaHeart } from "react-icons/fa";
import img from "../images/about.jpg"

export default function SectionTwo() {
  return (
    <section className="w-full py-12 px-6 md:px-20 bg-white">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="relative">
          <img
            src={img}
            alt="Doctors"
            className="rounded-lg shadow-lg"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 transition">
              ▶
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 mb-6">
            Dolor iure expedita id fuga asperiores qui sunt consequatur minima.
            Quidem voluptas deleniti. Sit quia molestiae quia quas qui magnam
            itaque veritatis dolores. Corrupti totam ut eius incidunt reiciendis
            veritatis asperiores placeat.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaFlask className="text-blue-600 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Ullamco laboris nisi ut aliquip consequat
                </h3>
                <p className="text-gray-600 text-sm">
                  Magni facilis facilis repellendus cum excepturi quaerat
                  praesentium libre trade
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaHospital className="text-blue-600 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Magnam soluta odio exercitationem reprehenderit
                </h3>
                <p className="text-gray-600 text-sm">
                  Quo totam dolorum at pariatur aut distinctio dolorum laudantium
                  illo direna pasata redi
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaHeart className="text-blue-600 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Voluptatem et qui exercitationem
                </h3>
                <p className="text-gray-600 text-sm">
                  Et velit et eos maiores est tempora et quos dolorem autem
                  tempora incidunt maxime veniam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
