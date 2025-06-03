import { LinearGradient } from "expo-linear-gradient";
import { Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";

const GradientComponent = ({ children }) => (
  <TouchableOpacity
    onPress={() => {
      console.log("Gradient pressed");
    }}
    activeOpacity={0.7}
  >
    <LinearGradient
      colors={["#575757", "#171717"]}
      start={{ x: 0.5, y: 0.0 }}
      end={{ x: 0.5, y: 1.0 }}
      style={{
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

export default GradientComponent;
