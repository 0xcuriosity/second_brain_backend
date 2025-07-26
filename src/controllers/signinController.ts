import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response, response } from "express";
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
interface SignInBody {
  username: string;
  password: string;
}
export const handleSignIn = async (
  req: Request<{}, {}, SignInBody>,
  res: Response
): Promise<Response> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(403).json({
        message: "username and password required",
      });
    }
    const foundUser = await userModel.findOne({
      username,
    });
    if (!foundUser) {
      return res.status(403).json({
        message: "username not registered",
      });
    }
    const match = await bcrypt.compare(password, foundUser?.password);
    if (!match) {
      return res.status(403).json({
        message: "invalid password",
      });
    }
    // if control reaches here, the passwords match
    const accessToken = jwt.sign(
      {
        id: foundUser._id,
      },
      JWT_SECRET
    );
    return res.status(200).json({
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error,
    });
  }
};
