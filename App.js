import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { db } from "./firebaseConfig";
import AddNewScreen from "./src/screens/AddNewScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ItemFolderScreen from "./src/screens/ItemFolderScreen";
import ItemListScreen from "./src/screens/ItemScreen";
import ShoppingScreen from "./src/screens/ShoppingScreen";
import { Colors } from "./src/globalStyles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
        headerTitleStyle: { color: Colors.heading },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Item" component={ItemListScreen} />
      <Stack.Screen name="Item Folder" component={ItemFolderScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  /* TEST FOR DATABASE, DELETE IN FUTURE */
  const [folders, setFolders] = useState([""]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "folders"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} =>`, doc.data());
        });
        setFolders(querySnapshot);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  /*-------------------*/

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Octicons
                  name="home"
                  size={size + 1}
                  color={focused ? Colors.primary : "#ccc"}
                  style={{ marginTop: 1 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Add New"
            component={AddNewScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={size + 8}
                  color={focused ? Colors.primary : "#ccc"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Shopping List"
            component={ShoppingScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={size + 4}
                  color={focused ? Colors.primary : "#ccc"}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
