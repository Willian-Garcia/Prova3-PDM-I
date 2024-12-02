import { IBooks } from "../types/IBooks";
import api from "./api";

export const getAllBooks = async () => {
  const response = await api.get("/");
  return response.data;
};

export const createBooks = async (book: Omit<IBooks, "id">) => {
  const response = await api.post("/", book);
  return response.data;
};

export const updateBooks = async (book: IBooks) => {
  const response = await api.put(`/${book._id}`, book);
  return response.data;
};

export const deleteBooks = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const getTotalDisciplines = async () => {
  const response = await api.get("/total-disciplines");
  return response.data.totalDisciplines;
};

export const getTotalBooks = async () => {
  const response = await api.get("/total-books");
  return response.data.totalBooks;
};

export const getOldestBook = async () => {
  const response = await api.get("/oldest");
  return response.data;
};

export const getNewestBook = async () => {
  const response = await api.get("/newest");
  return response.data;
};

export const getBooksByPublisher = async (publisher: string) => {
  if (!publisher) {
    throw new Error("O nome da editora é obrigatório.");
  }
  const response = await api.get(`/publisher/${publisher}`);
  return response.data;
};