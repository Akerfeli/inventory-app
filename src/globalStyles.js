import { StyleSheet } from "react-native";

const Colors = {
  primaryDark: "1C3346",
  primary: "#256E67",
  secondary: "#AAD3C6",
  tertiary: "#D4F0E4",
  accent: "#F6A497",
  error: "#dc3545",
  heading: "#021711",
  text: "#0C2F3B",
  textLight: "#999",
  bgPrimary: "#F5F0E8",
  bgSecondary: "#f8f9fa",
  yellowFlag: "#FFD162",
};

const Fonts = {
  regular: "Roboto-Regular",
  bold: "Roboto-Bold",
};

const FontSizes = {
  xs: 14,
  s: 16,
  m: 20,
  l: 24,
};

const Spacing = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.m,
  },
  textPrimary: {
    color: Colors.text,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
  },
  textSecondary: {
    color: Colors.textLight,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.s,
  },
  heading: {
    color: Colors.heading,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.l,
    marginBottom: Spacing.s,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontFamily: Fonts.bold,
    fontSize: FontSizes.regular,
  },
});

export { Colors, Fonts, FontSizes, Spacing, Styles };
