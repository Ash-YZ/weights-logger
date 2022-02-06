import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Planner from "./pages/Planner";
import Navigation from "./components/Navigation/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Training";

function App() {
  return (
    <div className="bg-gray-700 text-white h-[100vh] w-full p-[7px]">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
