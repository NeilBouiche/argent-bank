import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../utils/apiSlice";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import Accounts from "../components/Accounts";
import { useNavigate } from "react-router";

export default function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.api.user);
  const token = useSelector((state) => state.api.token);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    } else {
      navigate("/sign-in");
    }
  }, [dispatch, navigate, token]);

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
