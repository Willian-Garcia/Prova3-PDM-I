import { Request, Response } from "express";
import Book from "../models/Books";

class BooksController {
  static async createBooks(req: Request, res: Response): Promise<Response> {
    try {
      const { course, title, author, publisher, year } = req.body;

      if (!course || !title || !author || !publisher || !year) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const newBook = new Book({ course, title, author, publisher, year });
      await newBook.save();

      return res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar o livro." });
    }
  }

  static async getAllBooks(req: Request, res: Response): Promise<Response> {
    try {
      const books = await Book.find().sort({ year: -1 });
      return res.status(200).json(books);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar os livros." });
    }
  }

  static async updateBooks(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { course, title, author, publisher, year } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID do livro é obrigatório." });
      }

      const updatedBooks = await Book.findByIdAndUpdate(
        id,
        { course, title, author, publisher, year },
        { new: true, runValidators: true }
      );

      if (!updatedBooks) {
        return res.status(404).json({ message: "Livro não encontrado." });
      }

      return res.status(200).json(updatedBooks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar o livro." });
    }
  }

  static async deleteBooks(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID do livro é obrigatório." });
      }

      const deletedBook = await Book.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({ message: "Livro não encontrado." });
      }

      return res.status(200).json({ message: "Livro deletado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar o livro." });
    }
  }

  static async getTotalDisciplines(req: Request, res: Response): Promise<Response> {
    try {
      const distinctCourses = await Book.distinct("course");
      const totalDisciplines = distinctCourses.length;  
      return res.status(200).json({ totalDisciplines });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao contar disciplinas." });
    }
  }
  

  static async getTotalBooks(req: Request, res: Response): Promise<Response> {
    try {
      const totalBooks = await Book.countDocuments();
      return res.status(200).json({ totalBooks });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao contar livros." });
    }
  }

  static async getOldestBook(req: Request, res: Response): Promise<Response> {
    try {
      const oldestBook = await Book.findOne().sort({ year: 1 }).select("title year");
      if (!oldestBook) {
        return res.status(404).json({ message: "Nenhum livro encontrado." });
      }
      return res.status(200).json(oldestBook);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o livro mais velho." });
    }
  }

  static async getNewestBook(req: Request, res: Response): Promise<Response> {
    try {
      const newestBook = await Book.findOne().sort({ year: -1 }).select("title year");
      if (!newestBook) {
        return res.status(404).json({ message: "Nenhum livro encontrado." });
      }
      return res.status(200).json(newestBook);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o livro mais novo." });
    }
  }

  static async getBooksByPublisher(req: Request, res: Response): Promise<Response> {
    try {
      const { publisher } = req.params;
  
      if (!publisher) {
        return res.status(400).json({ message: "O nome da editora é obrigatório." });
      }
  
      // Usar expressão regular para ignorar maiúsculas/minúsculas
      const books = await Book.find({ publisher: { $regex: new RegExp(`^${publisher}$`, "i") } })
        .select("title author publisher year")
        .lean();
  
      // Remover duplicatas com base no título
      const uniqueBooks = books.reduce((acc: any[], book) => {
        if (!acc.some((b) => b.title === book.title)) {
          acc.push(book);
        }
        return acc;
      }, []);
  
      if (uniqueBooks.length === 0) {
        return res.status(404).json({ message: "Nenhum livro encontrado para esta editora." });
      }
  
      // Ordenar os livros pelo ano de forma decrescente (mais recente primeiro)
      uniqueBooks.sort((a, b) => b.year - a.year);
  
      return res.status(200).json(uniqueBooks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar livros pela editora." });
    }
  }
 
}

export default BooksController;
