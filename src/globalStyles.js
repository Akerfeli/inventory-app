import { StyleSheet } from "react-native";

const Colors = {
  primaryDark: "#0C2F3B",
  primary: "#256E67",
  secondary: "#AAD3C6",
  tertiary: "#D4F0E4",
  accent: "#F6A497",
  error: "#dc3545",
  heading: "#0C2F3B",
  text: "#0C2F3B",
  textMid: "#999",
  textLight: "#f8f9fa",
  bgPrimary: "#F5F0E8",
  bgSecondary: "#f8f9fa",
  yellowFlag: "#FFD162",
};

const Fonts = {
  regular: "Roboto-Regular",
  bold: "Roboto-Bold",
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textPrimary: {
    color: Colors.text,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  textSecondary: {
    color: Colors.textLight,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  heading: {
    color: Colors.heading,
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 32,
    width: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
});

export { Colors, Fonts, Styles };
