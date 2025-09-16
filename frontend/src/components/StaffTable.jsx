// src/components/StaffTable.jsx
import React, { useEffect, useState } from "react";
import { fetchStaff, deactivateStaffMember } from "../services/staffService";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import StaffForm from "./StaffForm";
import { useNavigate } from "react-router-dom";

export default function StaffTable() {
  const navigate = useNavigate()
  const [staff, setStaff] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(undefined);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedStaff, setSelectedStaff] = useState(null);
//   const [showForm, setShowForm] = useState(false);

  const loadStaff = async () => {
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (role) params.role = role;
      if (isActive !== undefined) params.isActive = isActive;

      const res = await fetchStaff(params);
      setStaff(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadStaff();
  }, [page, search, role, isActive]);

  const handleDeactivate = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this staff member?")) return;
    await deactivateStaffMember(id);
    loadStaff();
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    navigate(`/dashboard/staffs/edit/${staff._id}`)
  };

  const handleAdd = () => {
    setSelectedStaff(null);
    navigate(`/dashboard/staffs/add`)
  };

  const handleCloseForm = () => {
    setShowForm(false);
    loadStaff();
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="cashier">Cashier</option>
            <option value="pharmacist">Pharmacist</option>
          </select>
          <select
            className="border p-2 rounded"
            value={isActive ?? ""}
            onChange={(e) =>
              setIsActive(e.target.value === "" ? undefined : e.target.value === "true")
            }
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Plus size={18} /> Add Staff
        </button>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.email}</td>
              <td className="border px-4 py-2">{s.role}</td>
              <td className="border px-4 py-2">{s.phone}</td>
              <td className="border px-4 py-2">{s.isActive ? "Active" : "Inactive"}</td>
              <td className="border px-4 py-2 flex gap-2">
                <Eye className="cursor-pointer text-blue-500" />
                <Pencil
                  className="cursor-pointer text-green-500"
                  onClick={() => handleEdit(s)}
                />
                <Trash2
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeactivate(s._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* {showForm && (
        <StaffForm staff={selectedStaff} onClose={handleCloseForm} />
      )} */}
    </div>
  );
}
