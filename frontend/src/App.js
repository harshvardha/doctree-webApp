import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/login";
import PrescriptionDetails from "./pages/prescription/PrescriptionDetails";
import Prescriptions from "./pages/prescriptions/Prescriptions";
import Signup from "./pages/signup/signup";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="prescriptions">
            <Route index element={<Prescriptions />} />
            <Route path=":prescriptionId" element={<PrescriptionDetails />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
