"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DATABASE_URI = process.env.DATABASE_URI ||
    "mongodb+srv://admin:admin@cluster0.vmcqmwz.mongodb.net/";
const connectDB = () => {
    mongoose_1.default.connect(DATABASE_URI);
    console.log("connected to DB");
};
exports.connectDB = connectDB;
