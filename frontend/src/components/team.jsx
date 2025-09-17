
import React, { useState } from "react";
import muscab from "../assets/muscab.jpg";

const team = [
  {
    name: "Muscab Hassan",
    role: "Fullstack Developer",
    description: "Waxaan ku shaqeeyaa dhismaha backend iyo frontend labadaba.",
    image: muscab,
  },
  {
    name: "Omar",
    role: "UI/UX Designer",
    description: "Waxay diiradda saartaa design iyo waayo-aragnimada isticmaalaha.",
    image: muscab,
  },
  {
    name: "Anas Cabdullahi",
    role: "Database Engineer",
    description: "Waxaan mas'uul ka ahay dhismaha iyo maamulka database-ka.",
    image: "/images/kamal.jpg",
  },
  {
    name: "Hassan Maxamuud",
    role: "Project Manager",
    description: "Waxay hogaamisaa qorshaha iyo isku-duwidda project-ka.",
    image: "/images/ayaan.jpg",
  },
];

export default function Team() {
  const [showTeam, setShowTeam] = useState(false);

  return (
    <div className="py-12 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Our Project Team
      </h2>

      {/* Button toggle */}
      <button
        onClick={() => setShowTeam(!showTeam)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        {showTeam ? "Hide Team" : "Show Team"}
      </button>

      {/* Team section */}
      {showTeam && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
