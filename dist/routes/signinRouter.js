"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signInRouter = (0, express_1.Router)();
const signinController_1 = require("../controllers/signinController");
signInRouter.post("/", signinController_1.handleSignIn);
exports.default = signInRouter;
