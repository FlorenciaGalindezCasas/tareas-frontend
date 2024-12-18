const apiUrl = "http://localhost:4000";

const login = async (credentials) => {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    console.log(data);
    if (data.token) {
      localStorage.setItem("accessToken", data.token);
    }
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return { error: true, message: "An error occurred during login." };
  }
};

const register = async (userData) => {
  try {
    const res = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    return { error: true, message: "An error occurred during registration." };
  }
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

export { login, register, logout };
