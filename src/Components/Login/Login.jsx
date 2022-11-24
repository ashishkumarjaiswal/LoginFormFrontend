import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
// import { useEffect } from "react";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        { email: loginDetails.email, password: loginDetails.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setError(data.msg);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setError(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-form">
        <form method="POST" onSubmit={(e) => handleOnClick(e)}>
          <h1>Login</h1>

          <div className="content">
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleOnChange(e)}
                value={loginDetails.email}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <Link to="/forgotPassword" className="link">
              Forgot Password?
            </Link>
            <div>
              <Link to="/register" className="link">
                Register
              </Link>
            </div>
          </div>
          <div
            style={{
              color: "red",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            {error}
          </div>
          <div className="action">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
