
import { Request, Response } from "express";

import { BaseItem, Item } from "../types/items/item.interface";

import * as ItemService from "../services/items/item.service"

import HttpResponse from "../enums/response"

const index = async (request: Request, response: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();
        return response.status(HttpResponse.HTTP_OK).send(items);
    } catch (e: any) {
        return response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
}

const store = async (request: Request, response: Response) => {
    try {
        const item: BaseItem = request.body;
        const newItem = await ItemService.create(item);
        response.status(HttpResponse.HTTP_CREATED).json(newItem);
    } catch (e: any) {
        response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
}


const show = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const item: Item = await ItemService.find(id);

        if (item) {
            return response.status(HttpResponse.HTTP_OK).send(item);
        }
        response.status(HttpResponse.HTTP_NOT_FOUND).send("item not found");
    } catch (e: any) {
        response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
};

const update = async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        const itemUpdate: Item = request.body;

        const existingItem: Item = await ItemService.find(id);

        if (existingItem) {
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
        const id: number = parseInt(request.params.id, 10);
        await ItemService.remove(id);
        response.sendStatus(HttpResponse.HTTP_NO_CONTENT);
    } catch (e: any) {
        response.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR).send(e.message);
    }
};

export {
    index,
    store,
    show,
    update,
    destroy
}