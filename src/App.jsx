import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home";
import BabyAnnouncementsTable from "./results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result" element={<BabyAnnouncementsTable />} />
    </Routes>
  );
}

export default App;
