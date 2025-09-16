export default function SectionFour() {
  const services = [
    {
      icon: "💙",
      title: "Nesciunt Mete",
      description:
        "Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.",
    },
    {
      icon: "💊",
      title: "Eosle Commodi",
      description:
        "Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.",
    },
    {
      icon: "👨‍⚕️",
      title: "Ledo Markt",
      description:
        "Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.",
    },
  ];

  // xog cusub another section
  const anotherServices = [
    {
      icon: "🧪",
      title: "Lab Testing",
      description:
        "Providing reliable and fast laboratory testing with advanced equipment for accurate results.",
    },
    {
      icon: "🏥",
      title: "Emergency Care",
      description:
        "24/7 emergency response with professional doctors and nurses ready to assist anytime.",
    },
    {
      icon: "💉",
      title: "Vaccination",
      description:
        "Safe and secure vaccination services to protect patients against major diseases.",
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800">Services</h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto my-4 rounded"></div>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
        consectetur velit
      </p>

      {/* first services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm p-8 transition transform hover:scale-105 hover:border-blue-500 hover:shadow-lg"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-xl">
                <span className="text-4xl">{service.icon}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>

      {/* another services */}
      <div className="grid mt-10 grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {anotherServices.map((service, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm p-8 transition transform hover:scale-105 hover:border-blue-500 hover:shadow-lg"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-xl">
                <span className="text-4xl">{service.icon}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
