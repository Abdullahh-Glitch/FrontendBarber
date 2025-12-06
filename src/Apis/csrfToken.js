// csrfToken.js
import axios from "axios";

let csrfToken = null;

export const fetchCsrfToken = async () => {
  try {
    // Refresh access token first (backend sets it in cookie)
    await axios.post(
      "http://localhost:5000/auth/refresh-token",
      {},
      { withCredentials: true }
    );

    // Fetch new CSRF token
    const res = await axios.get("http://localhost:5000/api/csrf/csrf-token", {
      withCredentials: true,
    });
    csrfToken = res.data.csrfToken;

  } catch (err) {
    console.error("Failed to fetch CSRF token:", err);
    csrfToken = null;
  }

  return csrfToken;
};