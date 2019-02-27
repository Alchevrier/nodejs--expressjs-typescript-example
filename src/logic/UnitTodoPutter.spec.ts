import { expect } from "chai";
import "mocha";
import * as Mockito from "ts-mockito";
import { Datastore } from "../database/Datastore";
import { ITodo } from "./model";
import { TodoPutter } from "./TodoPutter";

describe("Unit testing the TodoPutter class", () => {

    let todoPutter: TodoPutter;
    let database: Datastore<ITodo>;

    beforeEach(() => {
        database = Mockito.mock(Datastore);
        todoPutter = new TodoPutter(Mockito.instance(database));
    });

    afterEach(() => {
        Mockito.reset(database);
        todoPutter = null;
    });

    it("Should return a promise with true if the database returned successfully", async () => {
        Mockito.when(database.put(Mockito.anything())).thenResolve(true);
        const result = await todoPutter.addTodo("No Farine", "No Pain");
        expect(result).to.be.equal(true);

        const todo = Mockito.capture(database.put).first()[0];

        expect(todo.id).to.be.not.be.equal(undefined);
        expect(todo.id).to.be.not.be.equal(null);
        expect(todo.title).to.be.equal("No Farine");
        expect(todo.description).to.be.equal("No Pain");
    });

    it("Should return a promise with false if the database did not return successfully", async () => {
        Mockito.when(database.put(Mockito.anything())).thenResolve(false);
        const result = await todoPutter.addTodo("No Farine", "No Pain");
        expect(result).to.be.equal(false);

        const todo = Mockito.capture(database.put).first()[0];

        expect(todo.id).to.be.not.be.equal(undefined);
        expect(todo.id).to.be.not.be.equal(null);
        expect(todo.title).to.be.equal("No Farine");
        expect(todo.description).to.be.equal("No Pain");
    });

});
