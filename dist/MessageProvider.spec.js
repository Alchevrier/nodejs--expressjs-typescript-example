"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const MessageProvider_1 = require("./MessageProvider");
describe("Should provide a message", () => {
    it("Return a message", () => {
        chai_1.expect(new MessageProvider_1.MessageProvider().provide())
            .to.be.equal("Hello World!");
    });
    it("Always return the same message", () => {
        const mesageProvider = new MessageProvider_1.MessageProvider();
        chai_1.expect(mesageProvider.provide())
            .to.be.equal("Hello World!");
        chai_1.expect(mesageProvider.provide())
            .to.be.equal("Hello World!");
    });
});
//# sourceMappingURL=MessageProvider.spec.js.map