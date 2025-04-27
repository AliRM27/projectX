import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import SkeletonBox from "./Skeleton";

const Categorie = ({ name, extra, setQuery, queries, isLoading }) => {
  if (isLoading) {
    return (
      <SkeletonBox
        height={40}
        width={60}
        style={[styles.container, styles.inActive, extra]}
      />
    );
  }

  const isActive = queries.includes(name.toLowerCase());

  return (
    <Pressable
      style={[
        styles.container,
        isActive ? styles.active : styles.inActive,
        extra,
      ]}
      onPress={() => {
        setQuery(name.toLowerCase());
      }}
    >
      <Text
        style={[
          { fontWeight: 500 },
          isActive ? styles.active.txt : styles.inActive.txt,
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    marginRight: 16,
    minWidth: 56,
    alignItems: "center",
  },
  inActive: {
    backgroundColor: "#FAFAFB",
    borderColor: "#BFBFBF",
    txt: {
      color: "#A0A0A0",
    },
  },
  active: {
    backgroundColor: "black",
    borderColor: "black",
    txt: {
      color: "white",
    },
  },
});

export default Categorie;
