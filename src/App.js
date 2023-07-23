import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Authpage from "./pages/Authpage";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import ForgetPassword from "./Components/Auth/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
