import { SearchBar, Icon } from "@rneui/themed";
import React, { useState } from "react";
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

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const { userState } = useAuth();
  const {
    data: folderData,
    isLoading,
    error,
  } = useFetch({
    firebaseFunction: () => getRootContentAndFolderContent(userState.id),
  });
  const flatContent = useFlattenFolderContent(folderData);

  const updateSearch = (query) => {
    setSearchQuery(query); // ToDo
  };

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
    <SafeAreaView style={{ flex: 1, padding: 4 }}>
      <FolderCreationModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        parentFolder={folderData.id}
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

      {folderData && <FolderContent folderData={flatContent} folderName="" />}
      {flatContent.length === 0 && renderEmptyPrompt()}
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
