import { SearchBar, Icon } from "@rneui/themed";
import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FolderContent from "../components/FolderContent";
import FolderCreationModal from "../components/FolderCreationModal";
import FolderMenu from "../components/FolderMenu";
import { useAuth } from "../contexts/AuthContext";
import { Colors, Styles } from "../globalStyles";
import useFetch from "../hooks/useFetch";
import useFlattenFolderContent from "../hooks/useFlattenFolderContent";
import { getRootContentAndFolderContent } from "../services/firebaseService";
import useNewFetch from "../hooks/useNewFetch";
import { getItems, getSubFolders } from "../services/firebaseNewService";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const { userState } = useAuth();
  /*  const {
    data: folderData,
    isLoading,
    error,
  } = useFetch({
    firebaseFunction: () => getRootContentAndFolderContent(userState.id),
  }); */

  const params = "hMJWNp4qoL9LMtRq5WWf";
  const { dataItems, isLoadingItems, errorItems } = useNewFetch(
    getItems,
    params
  );
  const { dataSubfolders, isLoadingSubfolders, errorSubfolders } = useNewFetch(
    getSubFolders,
    params
  );

  const isLoading = isLoadingItems || isLoadingSubfolders;

  console.log("loading", dataItems);

  const flatContent = useMemo(() => {
    if (!isLoading || !dataSubfolders || !dataItems) {
      return null;
    }

    const flatArray = dataSubfolders
      .map((subfolder) => ({ ...subfolder, type: "folder" }))
      .concat(dataItems.map((obj) => ({ ...obj, type: "object" })));

    return flatArray;
  }, [dataItems, dataSubfolders, isLoading]);

  const renderEmptyPrompt = () => {
    return (
      <View style={styles.emptyPrompt}>
        <Text style={Styles.heading}>Add an item here</Text>
        <Icon
          name="long-arrow-alt-down"
          type="font-awesome-5"
          color={Colors.primary}
          size={40}
        />
      </View>
    );
  };

  // Fallback, if loading
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 8 }}>
      <FolderCreationModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        parentFolder="hMJWNp4qoL9LMtRq5WWf"
        onAdded={() => setModalVisible(false)}
      />
      {/*
      <SearchBar
        platform="android"
        placeholder="Search"
        onChangeText={updateSearch}
        value={searchQuery}
        containerStyle={{
          borderRadius: 30,
          marginVertical: 8,
          marginHorizontal: 8,
        }}
        searchIcon={{ name: "search", type: "ionicon" }}
        leftIconContainerStyle={{ paddingLeft: 8 }}
        rightIconContainerStyle={{ paddingRight: 8 }}
      />*/}
      <FolderMenu
        folderName="Home"
        onAddFolderPressed={() => setModalVisible(true)}
      />

      {flatContent && <FolderContent folderData={flatContent} folderName="" />}
      {flatContent && flatContent.length === 0 && renderEmptyPrompt()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyPrompt: {
    flexDirection: "column",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
