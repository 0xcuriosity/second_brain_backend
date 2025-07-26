import { RequestHandler, Router } from "express";
const brainRouter = Router();
import {
  handleCreateSharableLink,
  handleViewSharableLink,
} from "../controllers/brainController";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware";
brainRouter.post("/share", userAuthMiddleware, handleCreateSharableLink);
brainRouter.get("/:shareLink", handleViewSharableLink);
export default brainRouter;
