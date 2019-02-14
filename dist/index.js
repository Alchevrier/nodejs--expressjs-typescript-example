"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const App_1 = require("./App");
const port = process.env.PORT || 8080;
App_1.default.listen(port, (err) => {
    if (err) {
        return winston.error(err);
    }
    return winston.info(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map