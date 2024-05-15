import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { Colors } from "./src/globalStyles";
import AccountScreen from "./src/screens/AccountScreen";
import AddNewScreen from "./src/screens/AddNewScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ItemFolderScreen from "./src/screens/ItemFolderScreen";
import ItemListScreen from "./src/screens/ItemScreen";
import ShoppingScreen from "./src/screens/ShoppingScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import "react-native-reanimated";
import { getRootContent } from "./src/services/firebaseService";
import useFetch from "./src/hooks/useFetch";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
        headerTitleAlign: "center",
        headerTitleStyle: { color: Colors.heading, fontSize: 16 },
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
      <Stack.Screen
        name="Item Folder"
        component={ItemFolderScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { userState } = useAuth();

  /*   const { data, loading, error } = useFetch({
    firebaseFunction: () => getRootContent(userState.id),
  });

  if (data !== null) {
    console.log(data);
  }
 */
  const { data, loading, error } = useFetch(getRootContent(userState.id));
  if (data !== null) {
    console.log(data);
  }

  return (
    <>
      {!userState.isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: "Sign in",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: "Sign up",
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerTintColor: Colors.primary,
            headerTitleStyle: { fontSize: 16 },
            headerTitleAlign: "center",
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Octicons
                  name="home"
                  size={size - 1}
                  color={focused ? Colors.primary : "#ccc"}
                  style={{ marginTop: 1 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Octicons
                  name="heart"
                  size={size}
                  color={focused ? Colors.primary : "#ccc"}
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
                <Octicons
                  name="checklist"
                  size={size - 1}
                  color={focused ? Colors.primary : "#ccc"}
                  style={{ marginTop: 2 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Octicons
                  name="person"
                  size={size + 1}
                  color={focused ? Colors.primary : "#ccc"}
                  style={{ marginTop: 1 }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
}
