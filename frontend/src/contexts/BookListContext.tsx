import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  getAllBooks,
  createBooks,
  deleteBooks,
  updateBooks,
  getTotalDisciplines,
  getTotalBooks,
  getOldestBook,
  getNewestBook,
  getBooksByPublisher,
} from "../services/BookListService";
import { IBooks } from "../types/IBooks";

interface BookContextData {
  books: IBooks[];
  totalDisciplines: number;
  totalBooks: number;
  oldestBook: { title: string; year: number } | null;
  newestBook: { title: string; year: number } | null;
  booksByPublisher: IBooks[];
  loadBooks: () => Promise<void>;
  loadBooksByPublisher: (publisher: string) => Promise<void>;
  addBook: (book: Omit<IBooks, "id">) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  updateBook: (book: IBooks) => Promise<void>;
}

export const BookContext = createContext<BookContextData | undefined>(
  undefined
);

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [books, setBooks] = useState<IBooks[]>([]);
  const [totalDisciplines, setTotalDisciplines] = useState<number>(0);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [oldestBook, setOldestBook] = useState<{ title: string; year: number } | null>(null);
  const [newestBook, setNewestBook] = useState<{ title: string; year: number } | null>(null);
  const [booksByPublisher, setBooksByPublisher] = useState<IBooks[]>([]);

  const loadBooks = async () => {
    try {
      const bookData = await getAllBooks();
      const disciplines = await getTotalDisciplines();
      const totalBooksCount = await getTotalBooks();
      const oldest = await getOldestBook();
      const newest = await getNewestBook();

      setBooks(bookData);
      setTotalDisciplines(disciplines);
      setTotalBooks(totalBooksCount);
      setOldestBook(oldest);
      setNewestBook(newest);
    } catch (error) {
      console.error("Erro ao carregar os livros:", error);
    }
  };

  const loadBooksByPublisher = async (publisher: string) => {
    try {
      const books = await getBooksByPublisher(publisher);
      setBooksByPublisher(books);
    } catch (error) {
      console.error("Erro ao carregar livros da editora:", error);
    }
  };

  const addBook = async (book: Omit<IBooks, "id">) => {
    try {
      const newBook = await createBooks(book);
      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await deleteBooks(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  const updateBook = async (updatedBook: IBooks) => {
    try {
      const response = await updateBooks(updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book._id === response.id ? response : book))
      );
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        totalDisciplines,
        totalBooks,
        oldestBook,
        newestBook,
        booksByPublisher,
        loadBooks,
        loadBooksByPublisher,
        addBook,
        deleteBook,
        updateBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
