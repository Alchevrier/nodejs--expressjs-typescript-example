import { v1 as uuid } from "uuid";
import { Datastore } from "../database/Datastore";
import { ITodo } from "./model";

export class TodoPutter {

    private datastore: Datastore<ITodo>;

    constructor(datastore: Datastore<ITodo>) {
        this.datastore = datastore;
    }

    public async addTodo(title: string, description: string): Promise<boolean> {
        return this.datastore.put({id: uuid(), title, description});
    }
}
