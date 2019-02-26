import { IDocument } from "../database/model";

interface ITodo extends IDocument {
    title: string;
    description: string;
}