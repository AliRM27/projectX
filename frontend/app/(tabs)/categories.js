import React, { useState, useEffect } from "react";
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
  RefreshControl,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useQuery } from "@tanstack/react-query";
import { fetchShops } from "../../services/api";
import Shop from "../../components/Shop";
import Search from "../../assets/search.svg";
import Filter from "../../assets/filter.svg";
import Close from "../../assets/close.svg";

const categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisibale, setIsVisibale] = useState(false);
  const [value, setValue] = useState(false);
  // const [value2, setValue2] = useState(false);
  const [range, setRange] = useState([0, 60]);
  const [sliderWidth, setSliderWidth] = useState(0);

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["shops", searchQuery],
    queryFn: ({ queryKey }) => {
      const [, searchQuery] = queryKey;
      return fetchShops({ searchQuery, value, range });
    },
    enabled: true,
  });

  const handleLayout = (event) => {
    setSliderWidth(event.nativeEvent.layout.width);
  };

  const getThumbLeft = (value) => {
    const thumbSize = 18;
    const labelWidth = 45;
    const min = 0;
    const max = 100;
    const percent = (value - min) / (max - min);
    const usableWidth = sliderWidth - thumbSize;
    const thumbCenterX = percent * usableWidth + thumbSize / 2;
    return thumbCenterX - labelWidth / 2;
  };

  //   useEffect(() => {
  //   if (!searchQuery) {
  //     // Maybe reset data, or let the UI show "No results" naturally
  //   }
  // }, [searchQuery]);

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
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
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
          }}
        >
          <View style={styles.modalContent}>
            <Pressable
              onPress={() => setIsVisibale(false)}
              style={{ position: "absolute", top: 20, right: 30, zIndex: 1 }}
            >
              <Close width={40} height={40} />
            </Pressable>
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
              <Text style={styles.txt}>Show sold shops</Text>
              <Switch value={value} onValueChange={setValue} />
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 30,
              }}
            >
              <Text style={styles.txt}>Pick Up today</Text>
              <Switch value={value2} onValueChange={setValue2} />
            </View> */}
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                alignItems: "stretch",
                justifyContent: "center",
              }}
            >
              <View onLayout={handleLayout} style={styles.sliderWrapper}>
                {/* Floating Labels */}
                {sliderWidth > 0 && (
                  <>
                    <Text
                      style={[
                        styles.thumbLabel,
                        { left: getThumbLeft(range[0]) },
                      ]}
                    >
                      {range[0] + "€"}
                    </Text>
                    <Text
                      style={[
                        styles.thumbLabel,
                        { left: getThumbLeft(range[1]) },
                      ]}
                    >
                      {range[1] === 100 ? "100+€" : range[1] + "€"}
                    </Text>
                  </>
                )}
                <Text style={styles.txt}>Price</Text>
                <Slider
                  value={range}
                  onValueChange={(values) => setRange(values)}
                  minimumValue={0}
                  maximumValue={100}
                  step={15}
                  minimumTrackTintColor="black"
                  maximumTrackTintColor="lightgrey"
                  thumbTintColor="black"
                  trackStyle={styles.track}
                  thumbStyle={styles.thumb}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 30,
              gap: 20,
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={[styles.button, { borderColor: "grey" }]}
              onPress={() => {
                setValue(false);
                setIsVisibale(false);
                setTimeout(() => {
                  refetch();
                }, 0);
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 17 }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "black" }]}
              onPress={() => {
                setIsVisibale(false);
                refetch();
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 17 }}
              >
                Apply
              </Text>
            </TouchableOpacity>
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
    borderColor: "black",
    borderWidth: 2,
    padding: 30,
    gap: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: "50%",
  },
  txt: {
    textAlign: "center",
    fontSize: 16,
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
  track: {
    height: 3,
    borderRadius: 3,
  },
  thumb: {
    height: 16,
    width: 18,
    borderRadius: 4,
    backgroundColor: "black",
  },
  sliderWrapper: {
    height: 20,
    justifyContent: "center",
  },
  thumbLabel: {
    position: "absolute",
    top: 50,
    fontSize: 14,
    color: "black",
    textAlign: "center",
    width: 45,
  },
});

export default categories;
