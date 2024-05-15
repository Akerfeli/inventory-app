import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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
    <View style={styles.container}>
      <TextInput
        placeholder="Type or select category"
        value={inputText}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus} // Call handleInputFocus when input is focused
        onBlur={handleInputBlur} // Call handleInputBlur when input loses focus
        style={[
          styles.textInputContainer,
          isDropdownVisible ? styles.textInputContainerOpen : null,
        ]}
      />
      {isDropdownVisible && ( // Render dropdown only if isDropdownVisible is true
        <View style={styles.listContainer}>
          <FlatList
            data={filteredCategories}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleCategorySelect(item)}
                style={styles.listItem}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: "white",
    padding: 8,
  },
  textInputContainerOpen: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    overflow: "hidden",
  },
  listContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  listItem: {
    padding: 8,
  },
});

export default CategorySelection;
