import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/rootStack";
import { BookListScreen, HomeScreen, PublisherBookListScreen} from "./src/screens";
import { BookProvider } from './src/contexts/BookListContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <BookProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Buscas", headerShown: true }}
          />
          <Stack.Screen
            name="BookListScreen"
            component={BookListScreen}
            options={{ title: "Lista de Livros", headerShown: true }}
          />
          <Stack.Screen
            name="PublisherBookListScreen"
            component={PublisherBookListScreen}
            options={{ title: "Lista de Livros da Editora", headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
}
