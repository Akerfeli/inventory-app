import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { getCategories } from "../services/firebaseService";

const CategorySelection = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      setFilteredCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const handleInputChange = (text) => {
    setInputText(text);
    // Filter categories based on input text
    setFilteredCategories(
      categories.filter((category) =>
        category.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleCategorySelect = (category) => {
    setInputText(category);
    onSelectCategory(category);
  };

  return (
    <View>
      <TextInput
        placeholder="Type or select category"
        value={inputText}
        onChangeText={handleInputChange}
      />
      <FlatList
        data={filteredCategories}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategorySelect(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default CategorySelection;
