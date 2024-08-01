import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from "./components/Home.jsx"
import CropHealth from "./components/CropHealth.jsx";
import ClimateAdapt from "./components/ClimateAdapt.jsx";
import CropYeild from "./components/CropYeild.jsx";
import WaterManagement from "./components/WaterManagement.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop_health" element={<CropHealth />} />
        <Route path="/climate_adapt" element={<ClimateAdapt />} />
        <Route path="/crop_yeild" element={<CropYeild />} />
        <Route path="/water_management" element={<WaterManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
