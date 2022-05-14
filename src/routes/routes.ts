import express from "express";

export const router = express.Router();

import * as ItemController from "../controllers/item.controller"

router.route("/items")
    .get(ItemController.index)
    .post(ItemController.validation(), ItemController.store);


router.route("/items/:id")
    .get(ItemController.show)
    .put(ItemController.update)
    .delete(ItemController.destroy);

export default router;