import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Breadcrumbs = ({ currentScreenTitle, previousScreenTitle }) => {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const [depth, setDepth] = useState();

  useEffect(() => {
    const homeIndex = state.routes.findIndex((route) => route.name === "Home");
    // Calculate the depth from the current screen to the "Home" screen
    setDepth(state.routes.length - homeIndex);
  }, []);

  // If depth is more than 2, then also show "..."
  const showEllipses = depth > 3;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateHome} style={styles.icon}>
        <MaterialCommunityIcons name="home-variant" size={20} color="#999" />
      </TouchableOpacity>
      {showEllipses && (
        <>
          <Text style={styles.separator}>/</Text>
          <Text style={styles.ellipsis}>...</Text>
        </>
      )}
      {previousScreenTitle && (
        <>
          <Text style={styles.separator}>/</Text>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.screenTitle}>{previousScreenTitle}</Text>
          </TouchableOpacity>
        </>
      )}
      <Text style={styles.separator}>/</Text>
      <Text style={[styles.screenTitle, styles.bold]}>
        {currentScreenTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    width: "100%",
  },
  icon: {
    marginRight: 0,
  },
  separator: {
    marginHorizontal: 10,
    color: "#ccc",
  },
  ellipsis: {
    marginHorizontal: 4,
    color: "#aaa",
  },
  screenTitle: {
    marginRight: 0,
    color: "#888",
  },
  bold: {
    fontWeight: "bold",
    color: "black",
  },
});

export default Breadcrumbs;
