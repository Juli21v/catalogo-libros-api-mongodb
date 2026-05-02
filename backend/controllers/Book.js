import mongoose from "mongoose";
import Book from "../models/Book.js";

const listBooks = async (req, res) => {
  try {
    const activeOnly = req.query.all !== "true";
    const filter = activeOnly ? { dbStatus: true } : {};
    const books = await Book.find(filter).sort({ registerDate: -1 });
    res.status(200).json(books);
  } catch (e) {
    res.status(500).json({ message: String(e.message) });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }
    const doc = await Book.findById(id);
    if (!doc) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(doc);
  } catch (e) {
    res.status(500).json({ message: String(e.message) });
  }
};

const registerBook = async (req, res) => {
  try {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({ message: "Incomplete data: name and description required" });
    }

    const existing = await Book.findOne({ name: req.body.name });
    if (existing) {
      return res.status(409).json({ message: "A book with this name already exists" });
    }

    const created = new Book({
      name: req.body.name,
      description: req.body.description,
      dbStatus: true,
    });

    const result = await created.save();
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ message: String(e.message) });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const { name, description, dbStatus } = req.body;
    const payload = {};
    if (name !== undefined) payload.name = name;
    if (description !== undefined) payload.description = description;
    if (dbStatus !== undefined) payload.dbStatus = Boolean(dbStatus);

    const updated = await Book.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ message: String(e.message) });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }
    const updated = await Book.findByIdAndUpdate(
      id,
      { dbStatus: false },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book archived (soft delete)", book: updated });
  } catch (e) {
    res.status(500).json({ message: String(e.message) });
  }
};

export default { listBooks, getBookById, registerBook, updateBook, deleteBook };
