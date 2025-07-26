"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brainRouter = (0, express_1.Router)();
brainRouter.post("/share", (req, res) => {
    console.log("sharable link");
});
brainRouter.get("/share", (req, res) => {
    console.log("fetch another user's shared brain content");
});
exports.default = brainRouter;
