import React, { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/rootStack";
import { BookContext } from "../../contexts/BookListContext";
import { IBooks } from "src/types/IBooks";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "BookListScreen"> {}

const BookListScreen: React.FC<Props> = ({ navigation }) => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("BookListScreen deve ser usado dentro de um BookProvider.");
  }

  const { books, loadBooks, deleteBook } = context;

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const renderBook = ({ item }: { item: IBooks }) => (
    <View style={styles.bookContainer}>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTextTitle}>{item.title}</Text>
        <Text style={styles.bookText}>{item.author}</Text>
        <Text style={styles.bookText}>{item.publisher}</Text>
        <Text style={styles.bookText}>{item.year}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) =>
          item._id ? item._id.toString() : Math.random().toString()
        }
        renderItem={renderBook}
      />
    </View>
  );
};

export default BookListScreen;
