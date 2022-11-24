import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { useState } from "react";
// import { useEffect } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(["access_token"]);

  const [isAuth, setIsAuth] = useState(
    cookies.token === undefined ? false : true
  );
  const navigate = useNavigate();

  // const getAuth = async () => {
  //   const { data } = await axios.get("https://server-delta-dusky.vercel.app/isAuth");

  //   setIsAuth(data.success);
  // };

  useEffect(
    () => {
      setIsAuth(cookies.token === undefined ? false : true);
      if (isAuth) {
        navigate("/home");
      }
    },
    // eslint-disable-next-line
    []
  );

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
