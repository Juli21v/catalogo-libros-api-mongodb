import express from "express";
import book from "../controllers/Book.js";

const router = express.Router();

router.get("/", book.listBooks);
router.get("/:id", book.getBookById);
router.post("/", book.registerBook);
router.put("/:id", book.updateBook);
router.delete("/:id", book.deleteBook);

export default router;
