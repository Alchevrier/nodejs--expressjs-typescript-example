import * as express from "express";
import { MessageProvider } from "./MessageProvider";

class App {

    public express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.get("/", (request, response) => {
            response.json({
                message: new MessageProvider().provide(),
            });
        });

        this.express.use("/", router);
    }
}

export default new App().express;
