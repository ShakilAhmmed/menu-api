import mongoose, { Model, Schema, Document, model } from 'mongoose';
import { Item } from '../types/items/item.interface';


type ItemDocument = Document & Item;

const itemSchema: Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    description: {
        type: Schema.Types.String,
    },
    image: {
        type: Schema.Types.String,
    },
})

const Item: Model<ItemDocument> = mongoose.model<ItemDocument>('Item', itemSchema);

export { Item, ItemDocument };
