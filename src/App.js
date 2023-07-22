import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Authpage from "./pages/Authpage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authpage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
