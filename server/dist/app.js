"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, fastify_1.default)({
    logger: true,
});
app.register(cors_1.default, {
    origin: "*",
});
app.register(routes_1.default);
app.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`サーバー起動中：${address}`);
});
