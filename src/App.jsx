import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home";
import BabyAnnouncementsTable from "./results";

function App() {
  const [count, setCount] = useState(0);

  return (
     <BrowserRouter>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<BabyAnnouncementsTable />} />
      </BrowserRouter>
  );
}

export default App;
