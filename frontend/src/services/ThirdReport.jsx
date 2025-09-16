import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Users,
  Calendar,
  DollarSign,
  FileText,
  TrendingUp,
  Download,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { getHeaders } from "./staffService";

export default function ThirdReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
 
  // Fetch report from backend
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/reports",
          getHeaders()
        );
        console.log(data);
        setReport(data.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchReport();
  }, []);
  useEffect(() => console.log(report), [report]);

  // Static fallback data
  const fallbackData = {
    appointmentsByMonth: [
      { month: "Jan", appointments: 120 },
      { month: "Feb", appointments: 135 },
      { month: "Mar", appointments: 148 },
      { month: "Apr", appointments: 162 },
      { month: "May", appointments: 155 },
      { month: "Jun", appointments: 170 },
      { month: "Jul", appointments: 185 },
      { month: "Aug", appointments: 192 },
      { month: "Sep", appointments: 178 },
    ],
    patientsByDepartment: [
      { department: "Cardiology", patients: 450, color: "#3B82F6" },
      { department: "Internal Medicine", patients: 380, color: "#10B981" },
      { department: "Pediatrics", patients: 320, color: "#F59E0B" },
      { department: "Emergency", patients: 280, color: "#EF4444" },
      { department: "Surgery", patients: 220, color: "#8B5CF6" },
      { department: "Pharmacy", patients: 180, color: "#06B6D4" },
    ],
    revenueData: [
      { month: "Jan", revenue: 125000 },
      { month: "Feb", revenue: 132000 },
      { month: "Mar", revenue: 148000 },
      { month: "Apr", revenue: 155000 },
      { month: "May", revenue: 162000 },
      { month: "Jun", revenue: 158000 },
      { month: "Jul", revenue: 175000 },
      { month: "Aug", revenue: 182000 },
      { month: "Sep", revenue: 178000 },
    ],
    summaryStats: [
      {
        title: "Total Patients",
        value: report?.patients?.totalPatients || 0,
        change: "+12.5%",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        title: "This Month Appointments",
        value: report?.appointments?.totalAppointments || 0,
        change: "+8.2%",
        icon: Calendar,
        color: "text-green-600",
        bgColor: "bg-green-100",
      },
      {
        title: "Monthly Revenue",
        value: "$178,000",
        change: "+15.3%",
        icon: DollarSign,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      },
      {
        title: "Medical Records",
        value: "1,234",
        change: "+6.8%",
        icon: FileText,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
      },
    ],
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  // Merge backend data with fallback
  const appointmentsByMonth =
    report?.appointmentsByMonth || fallbackData.appointmentsByMonth;
  const patientsByDepartment =
    report?.patientsByDepartment || fallbackData.patientsByDepartment;
  const revenueData = report?.revenueData || fallbackData.revenueData;
  const summaryStats = report?.summaryStats || fallbackData.summaryStats;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Hospital performance and statistics
          </p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <p className="text-xs text-green-600">
                  {stat.change} from last period
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Appointments Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patients by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Patients by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientsByDepartment}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="patients"
                  label={({ department, patients }) =>
                    `${department}: ${patients}`
                  }
                >
                  {patientsByDepartment.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
