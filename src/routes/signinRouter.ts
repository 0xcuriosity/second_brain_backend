import { Router } from "express";
const signInRouter = Router();
import { handleSignIn } from "../controllers/signinController";
signInRouter.post("/", handleSignIn);
export default signInRouter;
