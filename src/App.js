// App.js
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TeacherLogin from "./components/teacher/Login";
import StudentLogin from "./components/student/Login";
import TeacherDashboard from "./components/teacher/Dashboard";
import StudentDashboard from "./components/student/Dashboard";

import { StateProvider } from "./reducers/questionReducer.js"; // Imort the StateProvider

function App() {
  return (
    <StateProvider>
      <Router>
        <div className="h-100 ">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teacherlogin" element={<TeacherLogin />} />
              <Route path="/studentlogin" element={<StudentLogin />} />
              <Route
                path="/teacherdashboard/*"
                element={<TeacherDashboard />}
              />
              <Route
                path="/studentdashboard/*"
                element={<StudentDashboard />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
