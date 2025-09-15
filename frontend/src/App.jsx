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
function App(){

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout /> } >
          <Route index element={<MainSection />} />
        </Route>
        <Route path="/Login" element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
        </Route>
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route index element={<Dashboard/>} />
          <Route path="patients" element={<Patients/>} />
          <Route path="appointments" element={<Patients/>} />
          <Route path="medical-records" element={<Appointments/>} />
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