"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const request = require("supertest");
const App_1 = require("./App");
describe("Testing Endpoint", () => {
    it("Should return the same constant", (done) => {
        request(App_1.default)
            .get("/")
            .end((err, res) => {
            chai_1.expect(res.body.message).to.equal("Hello World!");
            chai_1.expect(res.statusCode).to.be.equal(200);
            done();
        });
    });
});
//# sourceMappingURL=App.spec.js.map