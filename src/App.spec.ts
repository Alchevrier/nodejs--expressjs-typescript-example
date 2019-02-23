import { expect } from "chai";
import "mocha";
import request = require("supertest");
import express from "./App";

describe("Testing Endpoint", () => {
    it("Should return the same constant", (done) => {
        request(express)
            .get("/")
            .end((err, res) => {
                expect(res.body.message).to.equal("Hello World!");
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });
});
