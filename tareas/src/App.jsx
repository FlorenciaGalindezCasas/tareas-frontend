import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../src/router/routes";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;

