import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [registerDetails, setRegisterDetails] = useState({
    place: "",
    email: "",
    mobileNumber: "",
    newPassword: "",
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
    if (error === "Password Updated Successfully Please Login") {
      setRegisterDetails({
        place: "",
        email: "",
        mobileNumber: "",
        newPassword: "",
      });
    }
  }, [error, navigate]);

  const handleOnClick = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/forgotPassword",
        {
          email: registerDetails.email,
          newPassword: registerDetails.newPassword,
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
    <div>
      <div className="login-form">
        <form method="POST" onSubmit={(e) => handleOnClick(e)}>
          <h1>Forgot Password</h1>
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
                placeholder="Place"
                name="place"
                onChange={(e) => handleOnChange(e)}
                value={registerDetails.place}
              />
            </div>
            <div className="input-field">
              <input
                type="newPassword"
                placeholder="New Password"
                name="newPassword"
                onChange={(e) => handleOnChange(e)}
                value={registerDetails.newPassword}
              />
            </div>
            <div>
              <Link to="/login" className="link">
                Login
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
            <button>Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
