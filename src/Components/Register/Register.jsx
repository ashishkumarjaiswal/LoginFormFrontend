import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    place: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setRegisterDetails({
      ...registerDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    if (error === "user registerd Successfully") {
      navigate("/login");
    }
  }, [error, navigate]);

  const handleOnClick = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://server-delta-dusky.vercel.app/register",
        {
          email: registerDetails.email,
          password: registerDetails.password,
          name: registerDetails.name,
          place: registerDetails.place,
          mobileNumber: registerDetails.mobileNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setError(data.msg);
    } catch (error) {
      setError(error.response.data.msg);
      console.log(error);
    }
  };
  return (
    <>
      <div className="login-form">
        <form method="POST" onSubmit={(e) => handleOnClick(e)}>
          <h1>Register</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleOnChange(e)}
                value={registerDetails.email}
              />
            </div>
            <div className="input-field">
              <input
                type="number"
                placeholder="Mobile Number"
                name="mobileNumber"
                onChange={(e) => handleOnChange(e)}
                value={registerDetails.mobileNumber}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) => handleOnChange(e)}
                value={registerDetails.name}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Place"
                name="place"
                onChange={(e) => handleOnChange(e)}
                value={registerDetails.place}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleOnChange(e)}
                value={registerDetails.password}
              />
            </div>
            <div>
              <Link to="/login" className="link">
                Login
              </Link>
            </div>
          </div>
      <div
        style={{ color: "red", backgroundColor: "white", textAlign: "center" }}
      >
        {error}
      </div>
          <div className="action">
            <button>Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
