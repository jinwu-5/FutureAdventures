import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

//  Generate authenticaiton token

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

//  Verify registered users

const authUser = (context) => {
  const authToken = context.req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ").pop().trim();
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new Error("Invalid token");
      }
    }
    throw new Error(
      `Authentication token must be "Authorization" : "Bearer [token]"`
    );
  }
  throw new Error("Authorization token must be provided");
};

export { generateToken, authUser };
