import { Router } from "express";
const contentRouter = Router();
import {
  handlePostContent,
  handleGetAllContent,
  handleDeleteContent,
} from "../controllers/contentController";
contentRouter.post("/", handlePostContent);
contentRouter.get("/", handleGetAllContent);
contentRouter.delete("/", handleDeleteContent);
export default contentRouter;
