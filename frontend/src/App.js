import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarsterPage from "@/MarsterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarsterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
