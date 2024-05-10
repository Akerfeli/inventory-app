import { Icon } from "@rneui/themed";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useAuth } from "../contexts/AuthContext";

const AccountScreen = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Account</Text>

      <TouchableOpacity onPress={() => signOut()}>
        <View
          style={{
            height: 56,
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Icon
            name="logout"
            type="material-community"
            color="grey"
            size={32}
          />
          <Text style={{ fontWeight: "bold" }}>Logga ut</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
