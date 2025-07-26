"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const zod_1 = require("zod");
exports.userValidator = zod_1.z.object({
    username: zod_1.z.string().min(3).max(10),
    password: zod_1.z
        .string()
        .min(8)
        .max(20)
        .regex(/[A-Z]/)
        .regex(/[a-z]/)
        .regex(/[0-9]/)
        .regex(/[^A-Za-z0-9]/),
});
