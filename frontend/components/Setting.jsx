import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LeftArrow from "../assets/svgs/chevron-left.svg";

const Setting = ({ name, Icon }) => {
  return (
    <>
      <TouchableOpacity
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          // borderBottomWidth: 2,
          borderBottomColor: "#ccc",
          paddingVertical: 20,
        }}
        activeOpacity={0.5}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Icon width={27} height={27} />
          <Text style={{ fontSize: 15, fontWeight: 500 }}>{name}</Text>
        </View>
        <LeftArrow />
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          width: "100%",
        }}
      />
    </>
  );
};

export default Setting;
