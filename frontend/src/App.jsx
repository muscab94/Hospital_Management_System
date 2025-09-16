import Header from "./components/header"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom"
import MainSection from "./components/mainSection"
import LoginForm from "./components/LoginForm"
import RootLayout from "./RootLayout/RootLayout"
import AuthLayout from "./RootLayout/AuthLayout"
import DashBoardLayout from "./RootLayout/DashBoardLayout"
import Dashboard from "./pages/Dashboard"
import Patients from "./pages/Patients"
import Appointments from "./pages/Appointments"
import Staffs from "./pages/Staffs"
import Reports from "./pages/Reports"
import MedicalRecords from "./pages/MedicalRecords"
import ContactForm from "./components/ContactForm"
import SectionAppointment from "./components/Appointment"
import About from "./pages/About"
import Service from "./pages/service"
import Department from "./pages/Department"
import Doctor from "./pages/DoctorPages"
import DoctorPages from "./pages/DoctorPages"
function App(){

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout /> } >
          <Route index element={<MainSection />} />
          <Route path="/contact" element={<ContactForm/>} />
          <Route path="/appointment" element={<SectionAppointment/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="/Department" element={<Department/>} />
          <Route path="/doctor" element={<DoctorPages/>} />
        </Route>
        <Route path="/Login" element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
        </Route>
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route index element={<Dashboard/>} />
          <Route path="patients" element={<Patients/>} />
          <Route path="appointments" element={<Appointments/>} />
          <Route path="medical-records" element={<MedicalRecords/>} />
          <Route path="staffs" element={<Staffs/>} />
          <Route path="reports" element={<Reports/>} />
        </Route>

      </>
    )
  )

  return (
    <RouterProvider router={router} />
   )
}
export default App