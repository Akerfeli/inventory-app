import React, { useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

import FolderContent from "../components/FolderContent";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import { getFavorites } from "../services/firebaseService";

const FavoritesScreen = () => {
  const { userState } = useAuth();
  const { data, isLoading, error } = useFetch({
    firebaseFunction: () => getFavorites(userState.id),
  });

  console.log(data);

  // Fallback, if loading
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.centerContainer}>
      {data && (
        <FolderContent
          folderData={data}
          folderName="Favorites"
          onEmptyMessage="You have no favorites yet"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
