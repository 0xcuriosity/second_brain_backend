import { Router } from "express";
const tagRouter = Router();
import { handlePostTag, handleGetAllTags } from "../controllers/tagController";
tagRouter.post("/", handlePostTag);
tagRouter.get("/", handleGetAllTags);
export default tagRouter;
