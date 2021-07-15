import { API_URL } from "config";
import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    // Try to login and send error if fails
    try {
      // Post request to strapi backend
      const loginRes = await axios.post(`${API_URL}/auth/local`, {
        identifier,
        password,
      });

      // Get user data
      const user = loginRes.data;

      // Set Cookie with jwt token
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", JSON.stringify(user.jwt), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      // Return the user data
      res.status(200).json({ user: user.user });
    } catch (err) {
      // If login fails
      res.json({ msg: "Invalid email or password" });
    }
  } else {
    // If the request isn't a post request
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
