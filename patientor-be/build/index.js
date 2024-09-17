"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const requestLogger = (req, _res, next) => {
    console.log(req.method, req.path);
    next();
};
app.use(requestLogger);
app.get('/ping', (_req, res) => {
    res.send('pong');
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
