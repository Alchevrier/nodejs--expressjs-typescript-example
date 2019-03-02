import { expect } from "chai";
import "mocha";
import request = require("supertest");
import { App } from "./App";
import { Datastore } from "./database/Datastore";
import { ITodo } from "./logic/model";
import { TodoPutter } from "./logic/TodoPutter";
import { TodoRetriever } from "./logic/TodoRetriever";

describe(`Testing the GET "/" endpoint`, () => {

    let express: App;
    let todoPutter: TodoPutter;
    let todoRetriever: TodoRetriever;
    let datastore: Datastore<ITodo>;

    beforeEach(() => {
        datastore = new Datastore("test", "test");
        todoPutter = new TodoPutter(datastore);
        todoRetriever = new TodoRetriever(datastore);
        express = new App(
            todoRetriever,
            todoPutter,
        ).express;
    });

    afterEach(() => {
        datastore = null;
        todoPutter = null;
        todoRetriever = null;
        express = null;
    });

    it(`Should return the same constant`, (done) => {
        request(express)
            .get("/")
            .end((err, res) => {
                expect(res.body.message).to.equal("Hello World!");
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });
});

describe(`Testing the GET "/todos" endpoint`, () => {

    let express: App;
    let todoPutter: TodoPutter;
    let todoRetriever: TodoRetriever;
    let datastore: Datastore<ITodo>;

    beforeEach(() => {
        datastore = new Datastore("test", "test1");
        todoPutter = new TodoPutter(datastore);
        todoRetriever = new TodoRetriever(datastore);
        express = new App(
            todoRetriever,
            todoPutter,
        ).express;
    });

    afterEach(() => {
        datastore = null;
        todoPutter = null;
        todoRetriever = null;
        express = null;
    });

    it(`Should return an empty array`, (done) => {
        request(express)
            .get("/todos")
            .end((err, res) => {
                expect(res.statusCode).to.be.equals(200);
                expect(res.body).to.be.deep.equals([]);
                done();
            });
    });

    it(`Should return the same array of values`, (done) => {
        const values: ITodo[] = [ { id: "Id", title: "Title", description: "description"},
                                  { id: "Id2", title: "Title2", description: "description2"} ];
        values.forEach((todo) => datastore.put(todo));
        request(express)
            .get("/todos")
            .end((err, res) => {
                expect(res.statusCode).to.be.equals(200);
                expect(res.body).to.be.deep.equals(values);
                done();
            });
    });

});

describe(`Testing the GET "/todo/:id endpoint"`, () => {

    let express: App;
    let todoPutter: TodoPutter;
    let todoRetriever: TodoRetriever;
    let datastore: Datastore<ITodo>;

    beforeEach(() => {
        datastore = new Datastore("test", "test1");
        todoPutter = new TodoPutter(datastore);
        todoRetriever = new TodoRetriever(datastore);
        express = new App(
            todoRetriever,
            todoPutter,
        ).express;
    });

    afterEach(() => {
        datastore = null;
        todoPutter = null;
        todoRetriever = null;
        express = null;
    });

    it(`Should return 404 on an empty datastore`, (done) => {
        request(express)
            .get("/todo/12334")
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });

    it(`Should return 404 on todo not found`, (done) => {
        datastore.put({ id: "Id", title: "Title", description: "Desc"});
        request(express)
            .get("/todo/12334")
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });

    it(`Should return a todo if found`, (done) => {
        const todo: ITodo = { id: "12334", title: "Title", description: "Desc"};
        datastore.put(todo);
        request(express)
            .get(`/todo/${todo.id}`)
            .end((err, res) => {
                expect(res.statusCode).to.be.equals(200);
                expect(res.body).to.be.deep.equal(todo);
                done();
            });
    });
});

describe(`Testing the POST "/todo" endpoint`, () => {

    let express: App;
    let todoPutter: TodoPutter;
    let todoRetriever: TodoRetriever;
    let datastore: Datastore<ITodo>;

    beforeEach(() => {
        datastore = new Datastore("test", "test1");
        todoPutter = new TodoPutter(datastore);
        todoRetriever = new TodoRetriever(datastore);
        express = new App(
            todoRetriever,
            todoPutter,
        ).express;
    });

    afterEach(() => {
        datastore = null;
        todoPutter = null;
        todoRetriever = null;
        express = null;
    });

    it(`Should be successful on a valid request`, (done) => {
        const requestBody: any = { title: "ATitle", description: "ADescription" };
        request(express)
            .post("/todo")
            .send(requestBody)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

});
