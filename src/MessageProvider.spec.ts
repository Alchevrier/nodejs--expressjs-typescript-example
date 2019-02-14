import { expect } from "chai";
import "mocha";
import { MessageProvider } from "./MessageProvider";

describe("Should provide a message", () => {

    it("Return a message", () => {
        expect(new MessageProvider().provide())
        .to.be.equal("Hello World!");
    });

    it("Always return the same message", () => {
        const mesageProvider = new MessageProvider();
        expect(mesageProvider.provide())
        .to.be.equal("Hello World!");
        expect(mesageProvider.provide())
        .to.be.equal("Hello World!");
    });
});
