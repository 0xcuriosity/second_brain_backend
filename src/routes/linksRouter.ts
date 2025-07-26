import { Router } from "express";
const linkRouter = Router();
import { handleCreateLink } from "../controllers/linkController";
linkRouter.post("/", handleCreateLink);
export default linkRouter;
