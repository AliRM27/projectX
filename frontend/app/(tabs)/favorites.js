import { Text, View } from "react-native";
import React, { Component } from "react";

export class favorites extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text>favorites</Text>
      </View>
    );
  }
}

export default favorites;
