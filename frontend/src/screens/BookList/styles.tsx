import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#aaaaaa",
  },
  bookContainer: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12
  },
  bookDetails: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bookTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  bookText: {
    fontSize: 14,
    color: "black",
  },
});

export default styles;
