"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentRouter = (0, express_1.Router)();
const contentController_1 = require("../controllers/contentController");
contentRouter.post("/", contentController_1.handlePostContent);
contentRouter.get("/", contentController_1.handleGetAllContent);
contentRouter.delete("/", contentController_1.handleDeleteContent);
exports.default = contentRouter;
