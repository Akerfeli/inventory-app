import { CheckBox } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import AmountButton from "./AmountButton";
import CategorySelection from "./CategorySelection";
import CustomTextInput from "./CustomTextInput";
import FolderSelection from "./FolderSelection";
import { useAuth } from "../contexts/AuthContext";
import { Styles, Colors } from "../globalStyles";

const ItemForm = ({
  onSubmit,
  resetForm,
  initialData, //ToDo: implement with edit item
  onAddFolderPressed,
  selectedFolderId,
  setSelectedFolderId,
}) => {
  const { userState } = useAuth();
  const [inputErrors, setInputErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    parentId: selectedFolderId,
    amount: 1,
    description: "",
    category: "",
    favoriteList: false,
    shoppingListStatus: "notListed",
    createdBy: userState.id,
  });

  useEffect(() => {
    handleChange("parentId", selectedFolderId);
  }, [selectedFolderId]);

  // Reset form
  useEffect(() => {
    setFormData({
      name: "",
      parentId: selectedFolderId, // If we think the user wants the same folder?
      amount: 1,
      description: "",
      category: "",
      favoriteList: false,
      shoppingListStatus: "notListed",
      createdBy: userState.id,
    });
    setInputErrors({});
  }, [resetForm]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(parseInt(formData.amount))) {
      errors.amount = "Amount must be a number"; //ToDo: Should we allow floats?
    }

    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleShoppingListChange = (value) => {
    const shoppingListStatus = value ? "toBuy" : "notListed";
    handleChange("shoppingListStatus", shoppingListStatus);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        width: "80%",
        gap: 8,
        paddingVertical: 16,
        marginTop: 8,
      }}
    >
      <View style={{ marginBottom: 16 }}>
        <Text style={Styles.textLabel}>Folder</Text>
        <FolderSelection
          selectedFolderId={selectedFolderId}
          onSelectFolder={(folderId) => setSelectedFolderId(folderId)}
          onAddFolderPressed={onAddFolderPressed}
        />
      </View>
      <CustomTextInput
        label="Name"
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
        error={inputErrors?.name}
      />
      <CustomTextInput
        label="Description"
        placeholder="Description"
        value={formData.description}
        onChangeText={(value) => handleChange("description", value)}
        error={inputErrors?.description}
        rows={4}
      />
      <View style={{ marginBottom: 32 }}>
        <Text style={Styles.textLabel}>Category</Text>
        <CategorySelection
          selectedCategory={formData.category}
          onSelectCategory={(value) => handleChange("category", value)}
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={Styles.textLabel}>Amount</Text>
        <AmountButton
          amount={formData.amount}
          changeAmount={(value) => handleChange("amount", value)}
        />
        {/*ToDo: add error message for amount*/}
      </View>
      <CheckBox
        checked={formData.shoppingListStatus === "toBuy"}
        title="In shopping list"
        checkedColor={Colors.primary}
        onPress={() =>
          handleShoppingListChange(formData.shoppingListStatus !== "toBuy")
        }
        containerStyle={{
          backgroundColor: "transparent",
          marginLeft: 0,
          padding: 0,
        }}
      />
      <CheckBox
        title="Favorite"
        checked={formData.favoriteList}
        checkedIcon="heart"
        uncheckedIcon="heart-o"
        checkedColor={Colors.accent}
        containerStyle={{
          backgroundColor: "transparent",
          marginLeft: 0,
          padding: 0,
        }}
        onPress={() => handleChange("favoriteList", !formData.favoriteList)}
      />
      <TouchableOpacity
        style={[Styles.primaryButton, { marginTop: 16 }]}
        onPress={handleSubmit}
      >
        <Text style={Styles.primaryButtonText}>Add item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemForm;
