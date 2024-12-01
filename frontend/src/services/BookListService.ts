import { IBooks } from "../types/IBooks";
import api from "./api";

// Obtém todos os livros
export const getAllBooks = async () => {
  const response = await api.get("/");
  return response.data;
};

// Cria um novo livro
export const createBooks = async (book: Omit<IBooks, "id">) => {
  const response = await api.post("/", book);
  return response.data;
};

// Atualiza um livro existente
export const updateBooks = async (book: IBooks) => {
  const response = await api.put(`/${book._id}`, book);
  return response.data;
};

// Deleta um livro
export const deleteBooks = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

// Obtém o número total de disciplinas
export const getTotalDisciplines = async () => {
  const response = await api.get("/total-disciplines");
  return response.data.totalDisciplines;
};

// Obtém o número total de livros
export const getTotalBooks = async () => {
  const response = await api.get("/total-books");
  return response.data.totalBooks;
};

// Obtém o livro mais velho
export const getOldestBook = async () => {
  const response = await api.get("/oldest");
  return response.data;
};

// Obtém o livro mais novo
export const getNewestBook = async () => {
  const response = await api.get("/newest");
  return response.data;
};
