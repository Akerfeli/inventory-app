import { Icon } from "@rneui/themed";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { Colors } from "../globalStyles";

const AccountScreen = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          height: 40,
          width: "50%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          backgroundColor: "white",
          borderRadius: 16,
        }}
      >
        <Icon
          name="logout"
          type="material-community"
          color={Colors.primary}
          size={24}
        />
        <Text style={{ fontWeight: "bold" }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
