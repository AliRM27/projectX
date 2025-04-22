import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Shop from "./Shop";
import ProductCard from "./ProductCard";

const Section = ({
  shops,
  isLoading,
  isFirst = false,
  isLast = false,
  name,
  queries,
}) => {
  return (
    <View
      style={{ marginTop: isFirst ? 30 : 0, marginBottom: isLast ? 60 : 30 }}
    >
      <View style={{ marginLeft: 15, marginBottom: 10 }}>
        <Text style={styles.category.txt}>
          {queries.includes("all") ||
          queries.includes(name.toLowerCase()) ||
          isFirst
            ? name
            : ""}
        </Text>
      </View>
      <ScrollView
        style={{ marginLeft: 15 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {isLoading ? (
          <ProductCard loading={true} />
        ) : (
          shops.map((item, key) => {
            if (item.category !== name.toLowerCase() && !isFirst) {
              return;
            }
            return <Shop item={item} key={key} />;
          })
        )}
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
