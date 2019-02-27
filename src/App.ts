import * as express from "express";
import { Datastore } from "./database/Datastore";
import { ITodo } from "./logic/model";
import { TodoPutter } from "./logic/TodoPutter";
import { TodoRetriever } from "./logic/TodoRetriever";
import { MessageProvider } from "./MessageProvider";

class App {

    public express;
    public todoRetriever: TodoRetriever;
    public todoPutter: TodoPutter;

    constructor(todoRetriever: TodoRetriever,
                todoPutter: TodoPutter) {
        this.express = express();
        this.todoRetriever = todoRetriever;
        this.todoPutter = todoPutter;
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();

        router.use(require("body-parser").json());

        router.get("/", (request, response) => {
            response.json({
                message: new MessageProvider().provide(),
            });
        });

        router.get("/todos", (request, response) => {
            this.todoRetriever.retrieveAll().then((todos: ITodo[]) => {
                response.json(todos);
            });
        });

        router.get("/todo/:id", (request, response) => {
            this.todoRetriever.retrieve(request.params.id).then((todo: ITodo) => {
                response.json(todo);
            });
        });

        router.post("/todo", (request, response) => {
            this.todoPutter.addTodo(request.body.title, request.body.description)
                    .then((result: boolean) => {
                        if (result) {
                            response.sendStatus(200);
                        } else {
                            response.sendStatus(400);
                        }
                    });
        });

        this.express.use("/", router);
    }
}

const datastore = new Datastore<ITodo>("todoDb", "todos");

export default new App(
    new TodoRetriever(datastore),
    new TodoPutter(datastore)).express;
