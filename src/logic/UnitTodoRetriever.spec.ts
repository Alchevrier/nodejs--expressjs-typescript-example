import { expect } from "chai";
import "mocha";
import * as Mockito from "ts-mockito";
import { Datastore } from "../database/Datastore";
import { ITodo } from "./model";
import { TodoRetriever } from "./TodoRetriever";

describe("Unit testing the TodoRetriever.getAll() function", () => {

    let todoRetriever: TodoRetriever;
    let datastore: Datastore<ITodo>;

    beforeEach(() => {
        datastore = Mockito.mock(Datastore);
        todoRetriever = new TodoRetriever(Mockito.instance(datastore));
    });

    afterEach(() => {
        Mockito.reset(datastore);
        todoRetriever = null;
    });

    it("Should return an empty array if the datastore is empty", async () => {
        Mockito.when(datastore.getAll()).thenResolve([]);
        const result = await todoRetriever.retrieveAll();
        expect(result).to.be.of.length(0);
    });

    it("Should return all todos if the datastore is not empty", async () => {
        const allTodos: ITodo[] = [ { id: "Id", title: "Title", description: "Description"},
                                    { id: "Id2", title: "Title2", description: "Description2"} ];
        Mockito.when(datastore.getAll()).thenResolve(allTodos);
        const result = await todoRetriever.retrieveAll();
        expect(result).to.be.deep.equal(allTodos);
    });

});

describe("Unit testing the TodoRetriever.get() function", () => {

    let todoRetriever: TodoRetriever;
    let datastore: Datastore<ITodo>;

    beforeEach(() => {
        datastore = Mockito.mock(Datastore);
        todoRetriever = new TodoRetriever(Mockito.instance(datastore));
    });

    afterEach(() => {
        Mockito.reset(datastore);
        todoRetriever = null;
    });

    it("Should return undefined if the datastore is empty", async () => {
        Mockito.when(datastore.getAll()).thenResolve([]);
        const result = await todoRetriever.retrieve("");
        expect(result).to.be.equal(undefined);
    });

    it("Should return an ITodo if the datastore has it", async () => {
        const todo: ITodo = { id: "Id", title: "Title", description: "Description" };
        Mockito.when(datastore.getAll()).thenResolve([todo]);
        const result = await todoRetriever.retrieve(todo.id);
        expect(result).to.be.equal(todo);
    });

    it("Should return undefined if the datastore does not have it", async () => {
        const todo: ITodo = { id: "Id", title: "Title", description: "Description" };
        Mockito.when(datastore.getAll()).thenResolve([todo]);
        const result = await todoRetriever.retrieve("");
        expect(result).to.be.equal(undefined);
    });

});
