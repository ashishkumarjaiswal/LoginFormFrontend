import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Home.css";

const Home = () => {
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
    try {
      const { data } = await axios.post(
        "/updateProfile",
        {
          mobileNumber: userDetails.mobileNumber,
          name: userDetails.name,
          place: userDetails.place,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setError(data.msg);
    } catch (error) {
      console.log(error);
      setError(error.data.msg);
    }
  };

  const [isEditable, setIsEditable] = useState(false);

  const getUserDetails = async () => {
    const { data } = await axios.get("/getUserData");
    setUserDetails(data.user);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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
                onChange={(e) => handleOnChange(e)}
                type="text"
                name="name"
                value={userDetails.name}
              />
            </p>
            <p className="userDetail">
              Mobile Number :
              <input
                onChange={(e) => handleOnChange(e)}
                type="text"
                name="mobileNumber"
                value={userDetails.mobileNumber}
              />
            </p>
            <p className="userDetail">
              Place :
              <input
                onChange={(e) => handleOnChange(e)}
                type="text"
                name="place"
                value={userDetails.place}
              />
            </p>
          </div>

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
            <button
              className="editButton"
              onClick={async () => {
                await axios.get("/logout");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
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
