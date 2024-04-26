import React, { useEffect, useState } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
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
        <MaterialCommunityIcons name="home-variant" size={20} color="gray" />
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
          <TouchableOpacity onPress={handleGoBack} style={styles.screenTitle}>
            <Text>{previousScreenTitle}</Text>
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
    backgroundColor: "white",
    paddingVertical: 8,
  },
  icon: {
    marginRight: 0,
  },
  separator: {
    marginHorizontal: 10,
  },
  ellipsis: {
    marginHorizontal: 5,
    color: "grey",
  },
  screenTitle: {
    marginRight: 0,
    color: "grey",
  },
  bold: {
    fontWeight: "bold",
    color: "black",
  },
});

export default Breadcrumbs;
