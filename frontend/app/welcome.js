import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

const welcome = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome</Text>
      <Link href={"/(auth)/register"}>
        <Text>Register</Text>
      </Link>
    </View>
  );
};

export default welcome;
