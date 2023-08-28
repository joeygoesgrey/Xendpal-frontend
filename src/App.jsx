import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Table from "./pages/Table";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import Form from "./pages/Form";
import GoogleCallback from "./google_login";
// import { ApplicationContext } from "./context/ApplicationContext";
import { token } from "./utils/utils";
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && !location.pathname.startsWith("/login")) {
      navigate("/auth/login");
    }
  }, [token, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/items" element={<Table />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/upload" element={<Form />} />
        {/* <Route path="/profile" element={<Blank />} /> */}
      </Route>
      <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>
      <Route path="/login" element={<GuestLayout />}>
        <Route path="/login/google" element={<GoogleCallback />} />
      </Route>
    </Routes>
  );
}

export default App;
