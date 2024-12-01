import React, { useContext, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Text, View } from "react-native";
import styles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/rootStack";
import { BookContext } from "../../contexts/BookListContext";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "HomeScreen"> {}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("HomeScreen deve ser usado dentro de um BookProvider.");
  }

  const {
    totalDisciplines,
    totalBooks,
    oldestBook,
    newestBook,
    loadBooks,
  } = context;

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bibliografia</Text>
      <View style={styles.Info_Container}>
        <Text style={styles.Info_Text}>
          Total de disciplinas: {totalDisciplines}
        </Text>
        <Text style={styles.Info_Text}>Total de livros: {totalBooks}</Text>
        <Text style={styles.Info_Text}>
          Livro mais velho:{" "}
          {oldestBook
            ? `${oldestBook.title} (${oldestBook.year})`
            : "Carregando..."}
        </Text>
        <Text style={styles.Info_Text}>
          Livro mais novo:{" "}
          {newestBook
            ? `${newestBook.title} (${newestBook.year})`
            : "Carregando..."}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate("BookListScreen")}
      >
        <Text style={styles.ButtonText}>Iniciar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
