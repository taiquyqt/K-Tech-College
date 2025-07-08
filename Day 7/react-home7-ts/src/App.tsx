import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import PatientsPage from "./pages/PatientsPage";
import OverviewPage from "./pages/OverviewPage";
import MapPage from "./pages/MapPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <Sidebar />
        <div className="contentWrapper">
          <Header />
          <main className="mainContent">
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;