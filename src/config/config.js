// src/config/config.js
const MODE = "development"; // or "production"

export const config = {
  BASE_URL: MODE === "development"
    ? "http://192.168.60.191:5000" // your local network IP
    : "https://your-production-domain.com", // change later

  WITH_CREDENTIALS: true,
};
