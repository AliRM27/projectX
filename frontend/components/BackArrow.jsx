import { Pressable } from "react-native";
import React from "react";
import ArrowLeft from "../assets/svgs/arrowleft.svg";
import { router } from "expo-router";

const BackArrow = () => {
  return (
    <Pressable
      onPress={() => router.back()}
      style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
    >
      <ArrowLeft width={30} height={30} />
    </Pressable>
  );
};

export default BackArrow;
