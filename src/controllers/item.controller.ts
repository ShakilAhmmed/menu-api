
import { Request, Response } from "express";

import { BaseItem, Item as ItemType } from "../types/items/item.interface";

import * as ItemService from "../services/items/item.service";

import HttpResponse from "../enums/response";

import { body, validationResult } from 'express-validator';
import { Item } from "../models/item.model";


const index = async (request: Request, response: Response) => {
    try {
        const items: ItemType[] = await ItemService.findAll();
        return response.status(HttpResponse.HTTP_OK).send(items);
    } catch (e: any) {
        return response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
}

const store = async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }
        const item: BaseItem = request.body;
        const newItem = await ItemService.create(item);
        response.status(HttpResponse.HTTP_CREATED).json(newItem);
    } catch (e: any) {
        response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
}


const show = async (request: Request, response: Response) => {
    const id: string = request.params.id;
    try {
        const item: ItemType | null = await ItemService.find(id);

        if (item) {
            return response.status(HttpResponse.HTTP_OK).send(item);
        }
        response.status(HttpResponse.HTTP_NOT_FOUND).send("item not found");
    } catch (e: any) {
        response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
};

const update = async (request: Request, response: Response) => {
    const id: string = request.params.id;
    try {
        const itemUpdate: ItemType = request.body;

        const existingItem: ItemType | null = await ItemService.find(id);

        if (existingItem) {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(422).json({ errors: errors.array() });
            }
            const updatedItem = await ItemService.update(id, itemUpdate);
            return response.status(HttpResponse.HTTP_OK).json(updatedItem);
        }

        const newItem = await ItemService.create(itemUpdate);

        response.status(HttpResponse.HTTP_CREATED).json(newItem);
    } catch (e: any) {
        response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
};

const destroy = async (request: Request, response: Response) => {
    try {
        const id: string = request.params.id;
        await ItemService.remove(id);
        response.sendStatus(HttpResponse.HTTP_NO_CONTENT);
    } catch (e: any) {
        response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
};


const validation = () => {
    return [
        body('name', 'Name is Required')
            .exists()
            .custom((value) => {
                if (value) {
                    return Item.findOne({ where: { email: value } }).then((item) => {
                        if (item) {
                            return Promise.reject('Name is Taken');
                        }
                    });
                }
            }),
        body('price', 'Price is Required').exists(),
    ];
};

export {
    validation,
    index,
    store,
    show,
    update,
    destroy
}