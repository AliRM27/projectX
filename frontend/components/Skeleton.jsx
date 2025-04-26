import { View, Text } from "react-native";
import React from "react";

const SkeletonBox = ({ height, width, style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: "#e5e7eb",
          borderRadius: 8,
          height,
          width,
        },
        style,
      ]}
    />
  );
};

export default SkeletonBox;
