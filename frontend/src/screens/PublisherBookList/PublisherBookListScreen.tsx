import React, { useContext, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import styles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/rootStack";
import { BookContext } from "../../contexts/BookListContext";
import { IBooks } from "src/types/IBooks";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "PublisherBookListScreen"> {}

  const PublisherBookListScreen: React.FC<Props> = ({ route }) => {
    const context = useContext(BookContext);
  
    if (!context) {
      throw new Error(
        "PublisherBookListScreen deve ser usado dentro de um BookProvider."
      );
    }
  
    const { booksByPublisher, loadBooksByPublisher } = context;
    const { publisher } = route.params;
  
    useEffect(() => {
      loadBooksByPublisher(publisher);
    }, [loadBooksByPublisher, publisher]);
  
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
          data={booksByPublisher}
          keyExtractor={(item) =>
            item._id ? item._id.toString() : Math.random().toString()
          }
          renderItem={renderBook}
        />
      </View>
    );
  };
  
  export default PublisherBookListScreen;
