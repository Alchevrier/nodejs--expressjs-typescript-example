import * as Loki from "lokijs";
import { IDocument } from "./model";

export class Datastore<T extends IDocument> {

    private database: Loki;
    private collection: Loki.Collection<T>;

    constructor(databaseName: string, collectionName: string) {
        this.database = new Loki(databaseName);
        this.collection = this.database.getCollection(collectionName);
        if (this.collection === null) {
            this.collection = this.database.addCollection(collectionName);
        }
    }

    public async put(toBePersisted: T): Promise<boolean> {
        const result = this.collection.insert(toBePersisted);
        if (result === undefined) {
            return false;
        } else {
            return true;
        }
    }

    public async getAll(): Promise<T[]> {
        return this.collection.find({});
    }

}
