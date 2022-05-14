import { Item } from "../../models/item.model";
import { BaseItem, Item as ItemType } from "../../types/items/item.interface";
import { Items } from "../../types/items/items.interface";




let items: Items = {
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
};

export const findAll = async (): Promise<ItemType[]> => await Item.find().sort('-createdAt').exec();;

export const find = async (id: string): Promise<ItemType | null> => await Item.findOne({ _id: id });;

export const create = async (newItem: BaseItem): Promise<ItemType> => {
    const item = Item.create(newItem);
    return item;
};

export const update = async (id: string, itemUpdate: BaseItem): Promise<ItemType | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }
    await Item.updateOne({ _id: id }, itemUpdate);
    return item;
};

export const remove = async (id: string): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    await Item.findByIdAndDelete(id);

};



