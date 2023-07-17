const BASE_URL = "http://localhost:3001/api/v1";

// Function to handle login request
export async function login(email, password) {
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.body.token;
      localStorage.setItem("token", token);
      return token;    
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Function to fetch user profile
export async function getUserProfile() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.body;
    } else {
      throw new Error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// function to update the user profile
export async function updateUserProfile(token, firstName, lastName) {
  const data = {
    firstName: firstName,
    lastName: lastName,
  };

  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.body;
    } else {
      throw new Error("Failed to update user profile");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}