import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import RepoDetails from "@/pages/RepoDetails";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:owner/:name" element={<RepoDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
