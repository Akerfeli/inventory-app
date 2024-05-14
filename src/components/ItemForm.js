import { Icon, CheckBox } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import AmountButton from "./AmountButton";
import CustomTextInput from "./CustomTextInput";
import { Styles } from "../globalStyles";

const ItemForm = ({ onSubmit, onReset, initialData }) => {
  const [inputErrors, setInputErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    folderId: "",
    amount: 1,
    description: "",
    category: "",
    isFavorite: false,
    isInShoppingList: false,
  });

  // Set initial data if it exists
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
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

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        width: "80%",
        gap: 16,
        paddingVertical: 16,
      }}
    >
      {/*ToDo: Add folder selection*/}
      <CustomTextInput
        label="Name"
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
        error={inputErrors?.name}
      />
      <View>
        <Text style={Styles.textLabel}>Amount</Text>
        <AmountButton
          amount={formData.amount}
          changeAmount={(value) => handleChange("amount", value)}
        />
      </View>
      <CustomTextInput
        label="Description"
        placeholder="Description"
        value={formData.description}
        onChangeText={(value) => handleChange("description", value)}
        error={inputErrors?.description}
        rows={5}
      />
      {/*ToDo: Add category selection*/}
      <CheckBox
        checked={formData.isInShoppingList}
        title="In shopping list"
        onPress={() =>
          handleChange("isInShoppingList", !formData.isInShoppingList)
        }
      />
      <CheckBox
        title="Favorite"
        checked={formData.isFavorite}
        checkedIcon="heart"
        uncheckedIcon="heart-o"
        checkedColor="red"
        onPress={() => handleChange("isFavorite", !formData.isFavorite)}
      />
      <TouchableOpacity style={Styles.primaryButton} onPress={handleSubmit}>
        <Text style={Styles.primaryButtonText}>Add item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemForm;