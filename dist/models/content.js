"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = void 0;
const mongoose_1 = require("mongoose");
const contentTypes = ["image", "video", "article", "audio"];
const contentSchema = new mongoose_1.Schema({
    link: { type: String, required: true, unique: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Tag", required: true }],
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
exports.contentModel = (0, mongoose_1.model)("Content", contentSchema);
