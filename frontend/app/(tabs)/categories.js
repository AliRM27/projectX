import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  Button,
  Modal,
  Switch,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useQuery } from "@tanstack/react-query";
import { fetchShops } from "../../services/api";
import Shop from "../../components/Shop";
import Search from "../../assets/search.svg";
import Filter from "../../assets/filter.svg";

const categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisibale, setIsVisibale] = useState(false);
  const [backgroundColor, setbackgroundColor] = useState("");
  const [value, setValue] = useState(false);

  // Fetch shops based on the search query
  const { data, isLoading, error } = useQuery({
    queryKey: ["shops", searchQuery],
    queryFn: fetchShops,
    enabled: true, // Always fetch, even when the search query is empty
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={{ position: "absolute", top: 26, left: 35, zIndex: 1 }}>
        <Search height={30} width={30} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          justifyContent: "space-around",
        }}
      >
        <TextInput
          style={styles.searchBar}
          placeholder="Search for shops..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={() => {
            setIsVisibale(true);
            setTimeout(() => {
              setbackgroundColor("rgba(0, 0, 0, 0.44)");
            }, 400);
          }}
          activeOpacity={0.5}
          style={styles.filter}
        >
          <Filter width={27} height={27} />
        </TouchableOpacity>
      </View>
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
      <Modal
        visible={isVisibale}
        onRequestClose={() => {
          setIsVisibale(false);
        }}
        transparent
        animationType="slide"
        // presentationStyle="pageSheet"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor,
          }}
        >
          <View style={styles.modalContent}>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}
            >
              Filter
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 30,
              }}
            >
              <Text style={styles.txt}>Pick Up today</Text>
              <Switch value={value} onValueChange={() => setValue((p) => !p)} />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Text style={styles.txt}>Price</Text>
              <Slider
                maximumValue={10}
                minimumValue={0}
                step={1}
                style={{ width: 300 }}
                thumbTintColor="black"
                maximumTrackTintColor="rgb(230, 230, 230)"
                minimumTrackTintColor="black"
                aria-labelledby="hi"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <TouchableOpacity
                style={[styles.button, { borderColor: "grey" }]}
                onPress={() => {
                  setIsVisibale(false);
                  setbackgroundColor("");
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 17 }}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "black" }]}
                onPress={() => {
                  setIsVisibale(false);
                  setbackgroundColor("");
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 17 }}
                >
                  Accept
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 46,
    fontSize: 16,
    width: 270,
    // backgroundColor: "#f9f9f9",
  },
  list: {
    paddingBottom: 16,
    alignItems: "center",
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
  filter: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ddd",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    gap: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: "50%",
  },
  txt: {
    fontSize: 15,
    color: "grey",
  },
  button: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    width: 150,
    height: 60,
    justifyContent: "center",
  },
});

export default categories;
