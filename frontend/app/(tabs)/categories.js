import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchShops } from "../../services/api";
import Shop from "../../components/Shop";

const categories = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch shops based on the search query
  const { data, isLoading, error } = useQuery({
    queryKey: ["shops", searchQuery],
    queryFn: fetchShops,
    enabled: true, // Always fetch, even when the search query is empty
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for shops..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Loading Indicator */}
      {isLoading && <></>}

      {/* Error Handling */}
      {error && <Text style={styles.errorText}>Error fetching shops</Text>}

      {/* Shops List */}
      {!isLoading && data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Shop item={item} />}
          contentContainerStyle={styles.list}
        />
      ) : (
        !isLoading && (
          <Text style={styles.noShopsText}>No shops were found</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchBar: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  list: {
    paddingBottom: 16,
  },
  noShopsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
});

export default categories;
