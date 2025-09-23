import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";
import { getHeaders } from "./staffService";

const reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get("https://hospital-management-system-9rt1.onrender.com/api/reports", getHeaders());
        console.log(data.data)
        setReport(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!report) return <div className="text-center mt-20">No data available</div>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Data for charts
  const appointmentsData = [
    { name: "Pending", value: report.appointments.pendingAppointments },
    { name: "Completed", value: report.appointments.completedAppointments },
    { name: "Cancelled", value: report.appointments.cancelledAppointments }
  ];

  const staffData = [
    { name: "Doctors", value: report.staff.totalDoctors },
    { name: "Receptionists", value: report.staff.totalReceptionists },
    { name: "Cashiers", value: report.staff.totalCashiers },
    { name: "Pharmacists", value: report.staff.totalPharmacists }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Total: {report.patients.totalPatients}</CardDescription>
          </CardHeader>
          <CardContent>
            Today: {report.patients.newPatientsToday} <br />
            This Month: {report.patients.newPatientsThisMonth}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Total: {report.appointments.totalAppointments}</CardDescription>
          </CardHeader>
          <CardContent>
            Today: {report.appointments.todayAppointments} <br />
            Pending: {report.appointments.pendingAppointments} <br />
            Completed: {report.appointments.completedAppointments} <br />
            Cancelled: {report.appointments.cancelledAppointments}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>Total: {report.medicalRecords.totalRecords}</CardDescription>
          </CardHeader>
          <CardContent>
            Today: {report.medicalRecords.recordsToday} <br />
            This Month: {report.medicalRecords.recordsThisMonth}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff</CardTitle>
            <CardDescription>Total: {report.staff.totalStaff}</CardDescription>
          </CardHeader>
          <CardContent>
            Doctors: {report.staff.totalDoctors} <br />
            Receptionists: {report.staff.totalReceptionists} <br />
            Cashiers: {report.staff.totalCashiers} <br />
            Pharmacists: {report.staff.totalPharmacists}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Appointments Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {appointmentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Staff Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={staffData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {staffData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default reports;
