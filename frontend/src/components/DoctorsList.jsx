// src/components/DoctorsList.jsx
import React, { useEffect, useState } from 'react';
import { fetchDoctors } from '../services/staffService';

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const loadDoctors = async () => {
      const res = await fetchDoctors();
      setDoctors(res.data.data);
    };
    loadDoctors();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Doctors</h2>
      <ul className="space-y-2">
        {doctors.map(d => (
          <li key={d._id} className="border p-2 rounded">
            <p className="font-semibold">{d.name}</p>
            <p>{d.specialty}</p>
            <p>{d.email} | {d.phone}</p>
            <p>License: {d.licenseNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
