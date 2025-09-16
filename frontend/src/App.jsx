import Header from "./components/header";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
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
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainSection />} />
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
          <Route path="reports" element={<ReportPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
export default App;
