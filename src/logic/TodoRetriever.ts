import { Datastore } from "../database/Datastore";
import { ITodo } from "./model";

export class TodoRetriever {

    private datastore: Datastore<ITodo>;

    constructor(datastore: Datastore<ITodo>) {
        this.datastore = datastore;
    }

    public async retrieveAll(): Promise<ITodo[]> {
        return this.datastore.getAll();
    }

    public async retrieve(id: string): Promise<ITodo> {
        const allTodos = await this.datastore.getAll();
        return allTodos.find((todo: ITodo) => {
            return todo.id === id;
        });
    }
}
