// src/components/StaffStats.jsx
import React, { useEffect, useState } from 'react';
import { fetchStaffStats } from '../services/staffService';

export default function StaffStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const res = await fetchStaffStats();
      setStats(res.data.data);
    };
    loadStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="p-4 bg-white rounded shadow grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="p-4 bg-blue-100 rounded text-center">Total Staff: {stats.totalStaff}</div>
      <div className="p-4 bg-green-100 rounded text-center">Doctors: {stats.doctors}</div>
      <div className="p-4 bg-yellow-100 rounded text-center">Receptionists: {stats.receptionists}</div>
      <div className="p-4 bg-red-100 rounded text-center">Cashiers: {stats.cashiers}</div>
      <div className="p-4 bg-purple-100 rounded text-center">Pharmacists: {stats.pharmacists}</div>
    </div>
  );
}
