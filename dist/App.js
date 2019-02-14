"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const MessageProvider_1 = require("./MessageProvider");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get("/", (request, response) => {
            response.json({
                message: new MessageProvider_1.MessageProvider().provide(),
            });
        });
        this.express.use("/", router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map