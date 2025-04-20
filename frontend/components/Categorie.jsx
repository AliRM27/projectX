import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";

const Categorie = ({ name, extra, setQuery, queries }) => {
  const isActive = queries.includes(name);

  return (
    <Pressable
      style={[
        styles.container,
        isActive ? styles.active : styles.inActive,
        extra,
      ]}
      onPress={() => {
        setQuery(name);
      }}
    >
      <Text
        style={[
          { fontWeight: 500 },
          isActive ? styles.active.txt : styles.inActive.txt,
        ]}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
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
