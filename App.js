import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AddNewScreen from "./src/screens/AddNewScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ItemListScreen from "./src/screens/ItemScreen";
import ShoppingScreen from "./src/screens/ShoppingScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Item" component={ItemListScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
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
                  color={color}
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
                  size={size + 16}
                  color={color}
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
                  color={color}
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
