import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { userValidator } from "../validators/userValidator";
import { userModel } from "../models/userModel";
interface SignUpBody {
  username: string;
  password: string;
}
export const handleSignUp = async (
  req: Request<{}, {}, SignUpBody>,
  res: Response
): Promise<Response> => {
  console.log("signup");
  console.log(req.body);
  try {
    const userValidation = userValidator.safeParse(req.body);
    if (!userValidation.success) {
      return res.status(411).json({
        message: userValidation.error,
      });
    }
    const { username, password } = userValidation.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      username,
      password: hashedPassword,
    });
    return res.status(200).json(createdUser);
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(403).json({
        message: "username already taken",
      });
    }
    return res.status(500).json({
      message: "server error",
    });
  }
};
