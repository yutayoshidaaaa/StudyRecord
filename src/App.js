import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopPage from "./TopPage/TopPages";
import Record from "./Record/Main";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/record" element={<Record />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
