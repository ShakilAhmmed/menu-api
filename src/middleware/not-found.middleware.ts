import { Request, Response, NextFunction } from "express";
import HttpResponse from "../enums/response";

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
    const message = "Resource not found";
    response.status(HttpResponse.HTTP_NOT_FOUND).send(message);
};