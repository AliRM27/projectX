import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import React from "react";

const welcome = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome</Text>
      <Pressable onPress={() => router.replace("(auth)/register")}>
        <Text>Register</Text>
      </Pressable>
    </View>
  );
};

export default welcome;
