import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import ModuleDetail from "./pages/ModuleDetail";
import CrossellDetail from "./pages/CrossellDetail";
import { PurchaseProvider } from "./contexts/PurchaseContext";

import AuthPage from "./pages/AuthPage";
import { RequireAuth } from "./components/RequireAuth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PurchaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/modulo/:slug" element={<RequireAuth><ModuleDetail /></RequireAuth>} />
          <Route path="/extra/:slug" element={<RequireAuth><CrossellDetail /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </PurchaseProvider>
  </React.StrictMode>
);
