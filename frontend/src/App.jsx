import Header from "./components/header";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes
} from "react-router-dom";
import MainSection from "./components/mainSection";
import LoginForm from "./components/LoginForm";
import RootLayout from "./RootLayout/RootLayout";
import AuthLayout from "./RootLayout/AuthLayout";
import DashBoardLayout from "./RootLayout/DashBoardLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Staffs from "./pages/Staffs";
import MedicalRecords from "./pages/MedicalRecords";
import ProtectedRoute from "./components/ProtectedRoute";
import MedicalRecordDetails from "./pages/MedicalRecordDetails";
import PatientForm from "./components/PatientForm";
import PatientDetail from "./components/PatientDetail";
import ViewAppointment from "./components/ViewAppointment";
import ReportPage from "./pages/ReportPage";
import ContactForm from "./components/ContactForm";
import SectionAppointment from "./components/Appointment";
import About from "./pages/About";
import Service from "./pages/service";
import Department from "./pages/Department";
import DoctorPages from "./pages/DoctorPages";
import StaffForm from "./components/StaffForm";
<<<<<<< HEAD
import StaffView from "./components/StafView";
=======
import ContactList from "./components/contactList";
>>>>>>> c0cb14d243b51d81e66e572799f4a4b1ebb05a1a

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainSection />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/appointment" element={<SectionAppointment />} />
          <Route path="/About" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/Department" element={<Department />} />
          <Route path="/doctor" element={<DoctorPages />} />
          <Route path="/contactList" element={<ContactList/>} />
          
        </Route>
        <Route path="/Login" element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute><DashBoardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/add" element={<PatientForm />} />
          <Route path="patients/view/:id" element={<PatientDetail />} />
          <Route path="patients/edit/:id" element={<PatientForm />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/view/:id" element={<ViewAppointment />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="medical-records/:id" element={<MedicalRecordDetails />} />
          <Route path="staffs" element={<Staffs />} />
          <Route path="staffs/add" element={<StaffForm />} />
          <Route path="staffs/edit/:id" element={<StaffForm />} />
          <Route path="staffs/view/:id" element={<StaffView />} />
          <Route path="reports" element={<ReportPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
