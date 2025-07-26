import { Router } from "express";
import { handleSignUp } from "../controllers/signupController";
const signUpRouter = Router();
signUpRouter.post("/", handleSignUp);
export default signUpRouter;
