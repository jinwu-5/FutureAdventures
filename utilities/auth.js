import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "2h" }
  );
};

export { generateToken };
