import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./database/connection";
import fs from "fs";
import path from "path";
import Book from "./models/Books";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// Configuração de CORS
app.use(
  cors({
    origin: "*", // Em produção, substituir "*" por uma lista de origens confiáveis
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Suporte a parâmetros JSON no corpo da requisição
app.use(express.json());

// Conecta ao MongoDB
connect();

// Função para carregar dados dos livros do arquivo books.json
async function loadBooks() {
  try {
    const filePath = path.join(__dirname, "database", "books.json");
    const booksData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Remove todos os livros existentes no banco de dados
    await Book.deleteMany();
    console.log("Coleção de livros limpa.");

    // Insere os livros do arquivo JSON
    await Book.insertMany(booksData);
    console.log("Livros carregados com sucesso no banco de dados.");
  } catch (error) {
    console.error("Erro ao carregar os livros:", error);
  }
}

// Carregar os livros no início da aplicação
loadBooks();

// Define a rota principal para todas as rotas da aplicação
app.use(routes);

// Inicializa o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://192.168.18.46:${PORT}`);
});
