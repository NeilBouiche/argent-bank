import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../utils/apiSlice";
import { useNavigate } from "react-router";

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(loginAsync({ email, password }))
      .then((payload) => {
        const token = payload.payload;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/user");
        } else {
          localStorage.clear();
          alert("L'utilisateur n'est pas dans la base de donnée");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
