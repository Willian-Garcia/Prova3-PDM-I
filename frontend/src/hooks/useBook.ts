import { useContext } from "react";
import { BookContext } from "src/contexts/BookListContext";

const useBooks = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks deve ser usado dentro de um BookProvider");
  }

  return context;
};

export default useBooks;