"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagRouter = (0, express_1.Router)();
const tagController_1 = require("../controllers/tagController");
tagRouter.post("/", tagController_1.handlePostTag);
tagRouter.get("/", tagController_1.handleGetAllTags);
exports.default = tagRouter;
