import { expect } from "chai";
import "mocha";
import request = require("supertest");
import * as Mockito from "ts-mockito";
import { App } from "./App";
import { ITodo } from "./logic/model";
import { TodoPutter } from "./logic/TodoPutter";
import { TodoRetriever } from "./logic/TodoRetriever";

describe(`Testing the GET "/" Endpoint`, () => {

    let express: App;
    let todoPutter: TodoPutter;
    let todoRetriever: TodoRetriever;

    beforeEach(() => {
        todoPutter = Mockito.mock(TodoPutter);
        todoRetriever = Mockito.mock(TodoRetriever);
        express = new App(
            Mockito.instance(todoRetriever),
            Mockito.instance(todoPutter),
        ).express;
    });

    afterEach(() => {
        Mockito.reset(todoPutter);
        Mockito.reset(todoRetriever);
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

describe(`Testing the GET "/todos" Endpoint`, () => {

    let express: App;
    let todoPutter: TodoPutter;
    let todoRetriever: TodoRetriever;

    beforeEach(() => {
        todoPutter = Mockito.mock(TodoPutter);
        todoRetriever = Mockito.mock(TodoRetriever);
        express = new App(
            Mockito.instance(todoRetriever),
            Mockito.instance(todoPutter),
        ).express;
    });

    afterEach(() => {
        Mockito.reset(todoPutter);
        Mockito.reset(todoRetriever);
        express = null;
    });

    it(`Should return an empty array`, (done) => {
        Mockito.when(todoRetriever.retrieveAll()).thenResolve([]);
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
        Mockito.when(todoRetriever.retrieveAll()).thenResolve(values);
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

    beforeEach(() => {
        todoPutter = Mockito.mock(TodoPutter);
        todoRetriever = Mockito.mock(TodoRetriever);
        express = new App(
            Mockito.instance(todoRetriever),
            Mockito.instance(todoPutter),
        ).express;
    });

    afterEach(() => {
        Mockito.reset(todoPutter);
        Mockito.reset(todoRetriever);
        express = null;
    });

    it(`Should return 404 on an empty datastore`, (done) => {
        Mockito.when(todoRetriever.retrieve("12334")).thenResolve(undefined);
        request(express)
            .get("/todo/12334")
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });

    it(`Should return 404 on todo not found`, (done) => {
        Mockito.when(todoRetriever.retrieve("12334")).thenResolve(undefined);
        request(express)
            .get("/todo/12334")
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });

    it(`Should return a todo if found`, (done) => {
        const todo: ITodo = { id: "12334", title: "Title", description: "Desc"};
        Mockito.when(todoRetriever.retrieve(`${todo.id}`)).thenResolve(todo);
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

    beforeEach(() => {
        todoPutter = Mockito.mock(TodoPutter);
        todoRetriever = Mockito.mock(TodoRetriever);
        express = new App(
            Mockito.instance(todoRetriever),
            Mockito.instance(todoPutter),
        ).express;
    });

    afterEach(() => {
        Mockito.reset(todoPutter);
        Mockito.reset(todoRetriever);
        express = null;
    });

    it(`Should be successful on a valid request`, (done) => {
        const requestBody: any = { title: "ATitle", description: "ADescription" };
        Mockito.when(todoPutter.addTodo(requestBody.title, requestBody.description)).thenResolve(true);
        request(express)
            .post("/todo")
            .send(requestBody)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

});
