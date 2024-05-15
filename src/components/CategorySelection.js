import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { getCategories } from "../services/firebaseService";

const CategorySelection = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility

  const { userState } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories(userState.id);
      setCategories(fetchedCategories);
      setFilteredCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setInputText(selectedCategory);
    }
  }, [selectedCategory]);

  const handleInputChange = (text) => {
    setInputText(text);
    setFilteredCategories(
      categories.filter((category) =>
        category.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleCategorySelect = (category) => {
    setInputText(category);
    onSelectCategory(category);
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  const handleInputFocus = () => {
    setIsDropdownVisible(true); // Show dropdown when input is focused
  };

  const handleInputBlur = () => {
    setIsDropdownVisible(false); // Hide dropdown when input loses focus
  };

  return (
    <View>
      <TextInput
        placeholder="Type or select category"
        value={inputText}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus} // Call handleInputFocus when input is focused
        onBlur={handleInputBlur} // Call handleInputBlur when input loses focus
      />
      {isDropdownVisible && ( // Render dropdown only if isDropdownVisible is true
        <FlatList
          data={filteredCategories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCategorySelect(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
};

export default CategorySelection;
