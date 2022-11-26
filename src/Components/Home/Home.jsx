import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Home.css";
import { useCookies } from "react-cookie";
import Loader from "../Loader/Loader";

const Home = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    place: "",
    mobileNumber: "",
  });

  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleOnUpdate = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://server-delta-dusky.vercel.app/updateProfile",
        {
          mobileNumber: userDetails.mobileNumber,
          name: userDetails.name,
          place: userDetails.place,
          token: cookies.token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setError(data.msg);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.data.msg);
    }
  };

  const [isEditable, setIsEditable] = useState(false);

  const getUserDetails = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://server-delta-dusky.vercel.app/getUserData",
        {
          token: cookies.token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserDetails(data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.data.msg);
    }
  };

  useEffect(
    () => {
      getUserDetails();
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className="details">
        <div className="userBox">
          <h2 style={{ textAlign: "center" }}>User Detail</h2>

          <div style={{ display: isEditable ? "none" : "" }}>
            <p className="userDetail">Email : {userDetails.email}</p>
            <p className="userDetail">Name : {userDetails.name} </p>
            <p className="userDetail">
              Mobile Number : {userDetails.mobileNumber}
            </p>
            <p className="userDetail">Place : {userDetails.place} </p>
          </div>

          <div style={{ display: isEditable ? "" : "none" }}>
            <p className="userDetail">Email : {userDetails.email}</p>
            <p className="userDetail">
              Name :
              <input
                className="updateProfile"
                onChange={(e) => handleOnChange(e)}
                type="text"
                name="name"
                value={userDetails.name}
              />
            </p>
            <p className="userDetail">
              Mobile Number :
              <input
                className="updateProfile"
                onChange={(e) => handleOnChange(e)}
                type="text"
                name="mobileNumber"
                value={userDetails.mobileNumber}
              />
            </p>
            <p className="userDetail">
              Place :
              <input
                className="updateProfile"
                onChange={(e) => handleOnChange(e)}
                type="text"
                name="place"
                value={userDetails.place}
              />
            </p>
          </div>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <Loader />
            </div>
          ) : (
            <div>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => {
                    if (isEditable) {
                      if (userDetails.name.length === 0) {
                        setError("Name not be empty");
                        return;
                      }
                      if (userDetails.place.length === 0) {
                        setError("Place not be empty");
                        return;
                      }
                      if (userDetails.mobileNumber.toString().length !== 10) {
                        setError("Mobile Number must be 10 digit");
                        return;
                      }
                      handleOnUpdate();
                    }
                    setIsEditable(!isEditable);
                  }}
                  className="editButton"
                >
                  {isEditable ? "Update" : "Edit"}
                </button>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  className="editButton"
                  onClick={() => {
                    removeCookie("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          <div
            style={{
              color: "red",
              backgroundColor: "white",
              textAlign: "center",
              margin: "10px",
            }}
          >
            {error}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
