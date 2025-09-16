import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import assets from "../assets";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileText,
  UserCog,
  BarChart3,
  LogOut,
} from "lucide-react";
import handleLogout from "../utils/logout";

function SideBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "", position: "" });

  // Get user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen w-64 fixed flex flex-col bg-blue-600 text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-blue-400">
        <img
          className="w-14 h-14 rounded-full border-2 border-slate-900"
          src={assets.health_data_security}
          alt="logo"
        />
        <div>
          <h1 className="font-bold text-xl leading-tight">CUMAN HMS</h1>
          <h3 className="text-sm text-blue-200 text-center">Hospital System</h3>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex-1 bg-blue-700 py-10 px-3 space-y-3">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-md"
                : "hover:bg-blue-500"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/Dashboard/patients"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-md"
                : "hover:bg-blue-500"
            }`
          }
        >
          <Users className="w-5 h-5" />
          Patients
        </NavLink>

        <NavLink
          to="/Dashboard/appointments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-md"
                : "hover:bg-blue-500"
            }`
          }
        >
          <CalendarCheck className="w-5 h-5" />
          Appointments
        </NavLink>

        <NavLink
          to="/Dashboard/medical-records"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-md"
                : "hover:bg-blue-500"
            }`
          }
        >
          <FileText className="w-5 h-5" />
          Medical Records
        </NavLink>

        <NavLink
          to="/Dashboard/staffs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-md"
                : "hover:bg-blue-500"
            }`
          }
        >
          <UserCog className="w-5 h-5" />
          Staff Management
        </NavLink>

        <NavLink
          to="/Dashboard/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-md"
                : "hover:bg-blue-500"
            }`
          }
        >
          <BarChart3 className="w-5 h-5" />
          Reports
        </NavLink>
        <NavLink to="/Dashboard/contactList" className="flex items-center gap-3 px-4 py-2 text-white rounded-lg font-medium  hover:bg-white hover:bg-opacity-30 shadow-md"><i class="fa-solid fa-address-book"></i>Contact List</NavLink>
      </div>

      {/* Footer / User Info */}
      <div className="px-4 py-5 border-t border-blue-400">
        <div className="mb-3">
          <h2 className="font-semibold text-white">{user.name || "User Name"}</h2>
          <p className="text-sm text-blue-200">{user.role || "Role"}</p>
          <p className="text-sm text-blue-200">{user.position || "Position"}</p>
        </div>
        <button
          className="flex items-center justify-center gap-2 w-full 
          px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-600 transition 
          text-sm font-medium"
          onClick={() => handleLogout(navigate, "/login")}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
