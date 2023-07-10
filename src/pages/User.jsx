import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../utils/apiSlice";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import Accounts from "../components/Accounts";

export default function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.api.user);
  console.log(user);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch]);

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
