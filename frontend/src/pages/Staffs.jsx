import DoctorsList from "../components/DoctorsList"
import StaffStats from "../components/StaffStats"
import StaffTable from "../components/StaffTable"

function Staffs() {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <StaffStats />
      <StaffTable />
      {/* <DoctorsList /> */}
    </div>
  )
}

export default Staffs