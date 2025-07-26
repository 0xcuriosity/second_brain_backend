"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleViewSharableLink = exports.handleCreateSharableLink = exports.generateRandomString = void 0;
const linkModel_1 = require("../models/linkModel");
const contentModle_1 = require("../models/contentModle");
const userModel_1 = require("../models/userModel");
const generateRandomString = (len) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghuijklmnopqrstuvwxyz0123456789";
    // 62 characters
    let result = "";
    for (let i = 0; i < len; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const handleCreateSharableLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const share = req.body.share;
        if (share) {
            const hash = (0, exports.generateRandomString)(20);
            const result = yield linkModel_1.linkModel.create({
                hash: hash,
                userId: req.userId,
            });
            return res.status(200).json(result);
        }
        else {
            const result = yield linkModel_1.linkModel.deleteOne({
                userId: req.userId,
            });
            return res.status(200).json(result);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error",
        });
    }
});
exports.handleCreateSharableLink = handleCreateSharableLink;
const handleViewSharableLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("object");
    try {
        const hash = req.params.shareLink;
        const link = yield linkModel_1.linkModel.findOne({
            hash,
        });
        if (!link) {
            return res.status(404).json({
                message: "link not found",
            });
        }
        // find the content now
        const content = yield contentModle_1.contentModel.find({
            userId: link.userId,
        });
        const user = yield userModel_1.userModel.findOne({
            _id: link.userId,
        });
        if (!user) {
            return res.status(500).json({
                message: "user not found , ideally should not happen",
            });
        }
        return res.status(200).json({
            username: user === null || user === void 0 ? void 0 : user.username,
            content: content,
        });
    }
    catch (error) {
        console.log(error);
    }
    return res.status(500).json({
        message: "server error",
    });
});
exports.handleViewSharableLink = handleViewSharableLink;
