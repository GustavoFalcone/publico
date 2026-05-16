import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import ModuleDetail from "./pages/ModuleDetail";
import CrossellDetail from "./pages/CrossellDetail";
import { PurchaseProvider } from "./contexts/PurchaseContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PurchaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modulo/:slug" element={<ModuleDetail />} />
          <Route path="/extra/:slug" element={<CrossellDetail />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </PurchaseProvider>
  </React.StrictMode>
);
