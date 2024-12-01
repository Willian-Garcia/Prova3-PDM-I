import fs from "fs";
import path from "path";
import Book from "../models/Books";
import { connect, disconnect } from "./connection";

async function seedBooks() {
  try {
    // Conectar ao banco de dados
    connect();

    // Ler o arquivo books.json
    const filePath = path.join(__dirname, "books.json");
    const booksData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Limpar a coleção de livros existente
    await Book.deleteMany();
    console.log("Coleção de livros limpa.");

    // Inserir os dados do arquivo
    await Book.insertMany(booksData);
    console.log("Livros inseridos com sucesso no banco de dados.");
  } catch (error) {
    console.error("Erro ao importar os livros:", error);
  } finally {
    // Fechar a conexão
    await disconnect();
  }
}

// Executar o script
seedBooks();
