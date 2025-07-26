"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupController_1 = require("../controllers/signupController");
const signUpRouter = (0, express_1.Router)();
signUpRouter.post("/", signupController_1.handleSignUp);
exports.default = signUpRouter;
