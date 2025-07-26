"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brainRouter = (0, express_1.Router)();
const brainController_1 = require("../controllers/brainController");
const userAuthMiddleware_1 = require("../middlewares/userAuthMiddleware");
brainRouter.post("/share", userAuthMiddleware_1.userAuthMiddleware, brainController_1.handleCreateSharableLink);
brainRouter.get("/:shareLink", brainController_1.handleViewSharableLink);
exports.default = brainRouter;
