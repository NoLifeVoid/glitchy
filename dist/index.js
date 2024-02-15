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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
});
app.use((0, helmet_1.default)());
app.use(cors());
app.use(limiter);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.contentType("text/html");
    try {
        const htmlContent = yield fs_1.promises.readFile(path_1.default.join(__dirname, '/index.html'), 'utf-8');
        res.send(htmlContent);
    }
    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
}));
app.get('/helloworld', (req, res) => {
    res.contentType("application/json");
    res.status(200).json({ "message": '🌍 Hello World!' });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
