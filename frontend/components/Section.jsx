import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Shop from "./Shop";
import ProductCard from "./ProductCard";

const Section = ({ shops, isLoading, isFirst = false, name, queries }) => {
  if (
    !isLoading &&
    !queries.includes(name.toLowerCase()) &&
    !isFirst &&
    !queries.includes("all")
  ) {
    return null;
  }
  return (
    <View style={{ marginTop: isFirst ? 30 : 0, marginBottom: 30 }}>
      <View style={{ marginLeft: 15, marginBottom: 10 }}>
        <Text style={styles.category.txt}>{name}</Text>
      </View>
      <ScrollView
        style={{ marginLeft: 15 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {isLoading
          ? Array.from({ length: 3 }, (_, index) => (
              <Shop loading={true} key={index} />
            ))
          : shops.map((item, key) => {
              if (item.category !== name.toLowerCase() && !isFirst) {
                return;
              }
              return <Shop item={item} key={key} />;
            })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    txt: {
      fontWeight: 600,
      fontSize: 23,
    },
  },
});

export default Section;
