import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useAuth } from "../contexts/AuthContext";
import { Colors } from "../globalStyles";
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

    fetchCategories(); // ToDo: switch this for use fetch?
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
        placeholderTextColor="#aaa"
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
            nestedScrollEnabled={true}
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fff",
    minHeight: 40,
  },
  textInputContainerOpen: { borderColor: Colors.secondary },
  container: {
    borderRadius: 16,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "white",
  },
  listContainer: {
    backgroundColor: "white",
    maxHeight: 300,
  },
  listItem: {
    padding: 12,
  },
});

export default CategorySelection;
