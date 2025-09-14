import Header from "./components/header"
import {Route, Routes} from "react-router-dom"
import MainSection from "./components/mainSection"
function App(){
  return <div>
     <Header/>
     <div>
     <Routes>
      <Route path="/" element={<MainSection/>} />
     </Routes>
     </div>
  </div>
}
export default App