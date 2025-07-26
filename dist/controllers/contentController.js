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
exports.handleGetAllContent = exports.handleDeleteContent = exports.handlePostContent = void 0;
const contentModle_1 = require("../models/contentModle");
const handlePostContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("create content");
    const { type, link, title, tags } = req.body;
    console.log(req.body);
    if (!type || !link || !title || !tags) {
        return res.status(400).json({
            message: "type , link , title, tags are required fields",
        });
    }
    try {
        const userId = req.userId;
        const newContent = {
            type,
            link,
            title,
            tags,
            userId,
        };
        const result = yield contentModle_1.contentModel.create(newContent);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            error,
        });
    }
});
exports.handlePostContent = handlePostContent;
const handleDeleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    if (!contentId) {
        return res.status(400).json({
            message: "Content ID required",
        });
    }
    const content = yield contentModle_1.contentModel.findOne({
        _id: contentId,
    });
    if (!content) {
        return res.status(404).json({
            message: "contentId not found",
        });
    }
    const result = yield contentModle_1.contentModel.deleteOne({
        _id: contentId,
    });
    return res.status(200).json(result);
});
exports.handleDeleteContent = handleDeleteContent;
const handleGetAllContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const allContentOfUser = yield contentModle_1.contentModel
            .find({
            userId,
        })
            .populate("userId")
            .populate("tags");
        return res.status(200).json(allContentOfUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error",
        });
    }
});
exports.handleGetAllContent = handleGetAllContent;
