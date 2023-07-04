import React from "react";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import Accounts from "../components/Accounts";

export default function User() {
  return (
    <div>
      <MenuBar />
      <main class="main bg-dark">
        <div class="header">
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          <button class="edit-button">Edit Name</button>
        </div>
        <Accounts />
      </main>
      <Footer />
    </div>
  );
}
