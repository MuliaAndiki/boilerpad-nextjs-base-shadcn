"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
class AuthRouter {
    constructor() {
        this.authRouter = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.authRouter.post("/", AuthController_1.default.register);
        this.authRouter.post("/login", AuthController_1.default.login);
        this.authRouter.post("/logout", AuthController_1.default.logout);
    }
}
exports.default = new AuthRouter().authRouter;
