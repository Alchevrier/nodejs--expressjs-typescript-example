import { expect } from "chai";
import "mocha";
import { Datastore } from "./Datastore";
import { IDocument } from "./model";

describe("Integration testing the database layer", () => {

    let datastore: Datastore<IDocument>;

    beforeEach(() => {
        datastore = new Datastore<IDocument>("test.json", "test");
    });

    it("Should return true if insert was succesful", async () => {
        const isSuccessful = await datastore.put({ id: ""});
        expect(isSuccessful).to.be.equal(true);
    });

    it("Should return true if insert is called twice on the same document", async () => {
        await datastore.put({ id: ""});
        const isSuccessful = await datastore.put({ id: ""});
        expect(isSuccessful).to.be.equal(true);
    });

    it("Should return an empty array if no document has the id", async () => {
        const result = await datastore.getAll()
        expect(result.length).to.be.equal(0);
    });

    it("Should return an array of size one", async () => {
        await datastore.put({id: "Hello"});
        const result = await datastore.getAll();
        expect(result.length).to.be.equal(1);
        expect(result[0]).to.be.contain({id: "Hello"});
    });

    it("Should return an array of multiple items", async () => {
        await datastore.put({id: "Hello"});
        await datastore.put({id: "World!"});
        const result = await datastore.getAll();
        expect(result.length).to.be.equal(2);
        expect(result.find((document) => document.id === "Hello")).to.not.be.equal(undefined);
        expect(result.find((document) => document.id === "World!")).to.not.be.equal(undefined);
    });
});
