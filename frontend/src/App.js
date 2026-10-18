import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarsterPage from "@/MarsterPage";
import AdminPage from "@/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarsterPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
