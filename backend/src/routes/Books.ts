import { Router } from "express";
import {BooksController} from "../controllers";

const router = Router();

router.post("/", BooksController.createBooks);
router.get("/", BooksController.getAllBooks);
router.put("/:id", BooksController.updateBooks);
router.delete("/:id", BooksController.deleteBooks);
router.get("/total-disciplines", BooksController.getTotalDisciplines);
router.get("/total-books", BooksController.getTotalBooks);
router.get("/oldest", BooksController.getOldestBook);
router.get("/newest", BooksController.getNewestBook);

export default router;