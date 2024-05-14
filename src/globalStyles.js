import { StyleSheet } from "react-native";

const Colors = {
  primaryDark: "#0C2F3B",
  primary: "#357E77",
  secondary: "#AAD3C6",
  tertiary: "#D4F0E4",
  accent: "#F6A497",
  error: "#ec4555",
  heading: "#0C2F3B",
  text: "#0C2F3B",
  textMid: "#999",
  textLight: "#f8f9fa",
  textError: "#FF5733",
  bgPrimary: "#F5F0E8",
  bgSecondary: "#f8f9fa",
  yellowFlag: "#FFD162",
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  centerItemsContainer: {
    flex: 1,
    alignItems: "center",
  },
  textPrimary: {
    color: Colors.text,
    fontSize: 16,
  },
  textSecondary: {
    color: Colors.textLight,
    fontSize: 14,
  },
  textLabel: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 12,
  },
  heading: {
    color: Colors.heading,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 32,
    width: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  textLink: {
    color: Colors.primary,
    fontSize: 14,
  },
});

export { Colors, Styles };
