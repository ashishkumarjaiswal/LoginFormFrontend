import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const getAuth = async () => {
    const { data } = await axios.get("/isAuth");

    setIsAuth(data.success);
  };

  useEffect(() => {
    getAuth();
  }, []);

  setTimeout(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, 1000);

  return (
    <>
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/home" element={isAuth ? <Home /> : <Login />} />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        <Route
          path="/forgotPassword"
          element={isAuth ? <Home /> : <ForgotPassword />}
        />
      </Routes>
    </>
  );
};

export default App;
