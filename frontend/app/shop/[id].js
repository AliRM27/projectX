import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import BackArrow from "../../components/BackArrow";
import { useQuery } from "@tanstack/react-query";
import { fetchShop } from "../../services/api";
import ProductCard from "../../components/ProductCard";
import Location from "../../assets/svgs/location.svg";
import Like from "../../assets/svgs/like.svg";
import { useFavorites } from "../../context/favoriteContext";
import Star from "../../assets/svgs/starReview.svg";
import GradientComponent from "../../colors/gradients";

const shop = () => {
  const { id } = useLocalSearchParams();

  const { toggleFavorite, isFavorite } = useFavorites();
  const isShopFavorite = isFavorite(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["shop", id],
    queryFn: fetchShop,
    refetchInterval: "",
  });

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <BackArrow />
      <Pressable style={styles.like} onPress={() => toggleFavorite(id)}>
        <Like
          width={30}
          height={30}
          stroke="yellow"
          fill={isShopFavorite ? "rgb(0, 0, 0)" : "transparent"}
        />
      </Pressable>
      {isLoading ? (
        <ProductCard loading={true} />
      ) : (
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: data.imageUrl }}
              resizeMode="cover"
            />
          </View>
          <View style={{ maxWidth: "50%" }}>
            <Text style={styles.name}>{data.name}</Text>
          </View>
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          gap: 15,
          backgroundColor: "rgb(241, 241, 241)",
        }}
        style={{ width: "100%" }}
      >
        <View
          style={{
            width: "100%",
            padding: 30,
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            jusatifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Location />
          <Text style={styles.adress}>
            {data.location.adress}, {data.location.postalCode}{" "}
            {data.location.city}, {data.location.country}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            gap: 20,
            alignItems: "start",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPressIn={() => {}}
            onPress={() => {
              router.push("shop/bags/" + id);
            }}
            style={{
              marginLeft: 10,
              width: "30%",
              display: data.products.length === 0 ? "none" : "flex",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              View all -{">"}
            </Text>
          </TouchableOpacity>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{}}
            contentContainerStyle={{
              alignItems: "center",
              gap: 30,
              paddingLeft: 20,
            }}
            horizontal={true}
          >
            {isLoading ? (
              <ProductCard loading={true} />
            ) : data.products.length === 0 ? (
              <Text style={{ fontSize: 20 }}>No Bags Available</Text>
            ) : (
              data.products.slice(0, 3).map((bag, key) => {
                return (
                  <ProductCard bag={bag} key={key} width={200} height={220} />
                );
              })
            )}
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flex: 1,
              borderRightWidth: 1,
              borderRightColor: "#ccc",
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 17 }}>Rating</Text>
            <View
              style={{
                padding: 15,
                borderRadius: 15,
                backgroundColor: "rgb(239, 239, 239)",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Star width={20} height={20} />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                {data.rating}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <GradientComponent>
              <Text
                style={{
                  color: "rgb(255, 255, 255)",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Give a Review
              </Text>
            </GradientComponent>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingBottom: 20,
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 17, marginVertical: 20 }}>More info</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Website: </Text>
            <Text>https://lotuz.com</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>ID: </Text>
            <Text>3486511290</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "white",
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  adress: {
    color: "black",
  },
  like: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    padding: 5,
    borderRadius: 50,
  },
});

export default shop;
