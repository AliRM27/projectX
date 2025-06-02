import React from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";

const ShopMap = ({ latitude, longitude, shopName }) => {
  // const openMapsApp = () => {
  //   const url = Platform.select({
  //     ios: `http://maps.apple.com/?ll=${latitude},${longitude}`,
  //     android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${shopName})`,
  //   });

  //   Linking.openURL(url);
  // };

  return (
    <Pressable>
      <MapView
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        pointerEvents="none" // Makes the map non-interactive (but still tappable via Pressable)
      >
        <Marker coordinate={{ latitude, longitude }} title={shopName} />
      </MapView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default ShopMap;
