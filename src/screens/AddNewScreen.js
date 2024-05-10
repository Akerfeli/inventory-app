import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { Button, View, Text } from "react-native";

const AddNewScreen = () => {
  const navigation = useNavigation();
  const [navigatedFolderId, setNavigatedFolderId] = useState(null);

  // On focus, update navigatedFolderId
  useFocusEffect(
    useCallback(() => {
      const navigationState = navigation.getState();
      const homeStackState = navigationState.routes.find(
        (route) => route.name === "HomeStack"
      )?.state;

      if (homeStackState) {
        const reversedRoutes = [...homeStackState.routes].reverse();

        // Find the latest "Item Folder" route
        const latestItemFolderRoute = reversedRoutes.find(
          (route) => route.name === "Item Folder"
        );

        const folderId = latestItemFolderRoute?.params?.folderId;
        setNavigatedFolderId(folderId);
      } else {
        setNavigatedFolderId(null);
      }
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Add new</Text>
      <Button
        title="Add new"
        onPress={() =>
          navigation.navigate("Item", { folderId: navigatedFolderId })
        }
      />
    </View>
  );
};

export default AddNewScreen;
