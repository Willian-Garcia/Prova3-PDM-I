import { Router } from "express";
import books from "./Books";

const router = Router();

router.use("/livros", books);

export default router;