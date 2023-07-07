import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import Accounts from "../components/Accounts";
import { getUserProfile } from "../utils/api";

export default function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserProfile(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error:", error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <MenuBar />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user ? user.firstName + " " + user.lastName : "User"}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <Accounts />
      </main>
      <Footer />
    </div>
  );
}
