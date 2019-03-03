import * as winston from "winston";
import { App } from "./App";
import { Datastore } from "./database/Datastore";
import { ITodo } from "./logic/model";
import { TodoPutter } from "./logic/TodoPutter";
import { TodoRetriever } from "./logic/TodoRetriever";

const port = process.env.PORT || 8080;

const datastore = new Datastore<ITodo>("todoDb", "todos");

const app = new App(
    new TodoRetriever(datastore),
    new TodoPutter(datastore)).express;

app.listen(port, (err) => {
    if (err) {
        return winston.error(err);
    }

    return winston.info(`Server is listening on ${port}`);
});
