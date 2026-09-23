import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";
import ResultPage from "./pages/resultpage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;