import axios from "axios";
import { config } from "../config/config";

let csrfToken = null;

export const fetchCsrfToken = async () => {
  try {
    if (csrfToken) return csrfToken;

    const res = await axios.get(
      `${config.BASE_URL}/api/csrf/csrf-token`,
      {
        withCredentials: true,
      }
    );

    csrfToken = res.data.csrfToken;
    return csrfToken;
  } catch (err) {
    console.error("Failed to fetch CSRF token:", err);
    csrfToken = null;
    return null;
  }
};