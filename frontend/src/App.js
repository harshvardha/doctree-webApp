import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login";
import PrescriptionDetails from "./pages/prescription/PrescriptionDetails";
import Prescriptions from "./pages/prescriptions/Prescriptions";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";

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
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
