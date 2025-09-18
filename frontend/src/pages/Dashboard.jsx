import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Users,
  Calendar,
  FileText,
  DollarSign,
  Activity,
  Clock,
} from "lucide-react";
import axios from "axios";
import { getHeaders } from "../services/staffService";

export default function Dashboard() {
  const [user, setUser] = useState();
  const [report, setReport] = useState();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  // Helper function for plain "HH:mm" string
  const formatPlainTime = (timeString) => {
    if (!timeString) return "";
    let [hours, minutes] = timeString.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 -> 12 and 13+ -> 1,2,...
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };
  const fetchAllAppointment = async () => {
    try {
      const res = await axios.get(
        "https://hospital-management-system-9rt1.onrender.com/api/appointments",
        getHeaders()
      );
      console.log(res.data);
      setAppointments(res.data.data);
    } catch (error) {}
  };
  // Fetch report from backend
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-system-9rt1.onrender.com/api/reports",
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
    fetchAllAppointment();
  }, []);
  useEffect(() => console.log(report), [report]);
  const stats = [
    {
      title: "Total Patients",
      value: report?.patients?.totalPatients || 0,
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Today's Appointments",
      value: report?.appointments?.totalAppointments || 0,
      change: "+3",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Medical Records",
      value: "1,234",
      change: "+8%",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Revenue (Month)",
      value: "$45,231",
      change: "+15%",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      activity: "New patient registered: John Smith",
      time: "2 minutes ago",
      type: "patient",
    },
    {
      id: 2,
      activity: "Appointment scheduled with Dr. Johnson",
      time: "5 minutes ago",
      type: "appointment",
    },
    {
      id: 3,
      activity: "Medical record updated for Patient #1234",
      time: "10 minutes ago",
      type: "record",
    },
    {
      id: 4,
      activity: "Payment received: $250",
      time: "15 minutes ago",
      type: "payment",
    },
    {
      id: 5,
      activity: "Prescription issued by Dr. Chen",
      time: "20 minutes ago",
      type: "prescription",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Alice Johnson",
      doctor: "Dr. Smith",
      time: "10:00 AM",
      type: "Consultation",
    },
    {
      id: 2,
      patient: "Bob Wilson",
      doctor: "Dr. Johnson",
      time: "11:30 AM",
      type: "Follow-up",
    },
    {
      id: 3,
      patient: "Carol Davis",
      doctor: "Dr. Chen",
      time: "2:00 PM",
      type: "Check-up",
    },
    {
      id: 4,
      patient: "David Brown",
      doctor: "Dr. Smith",
      time: "3:30 PM",
      type: "Consultation",
    },
  ];
  useEffect(() => setUser(JSON.parse(localStorage.getItem("user"))), []);
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening at CUMAN Hospital today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
              <p className="text-xs text-green-600 mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest activities in the hospital</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Today's Appointments
            </CardTitle>
            <CardDescription>Scheduled appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.patient.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {appointment.doctor.name} • {appointment.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">
                      {formatPlainTime(appointment.appointmentTime)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
