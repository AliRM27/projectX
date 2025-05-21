import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import Back from "../../../assets/svgs/arrowleft.svg";

const getEmail = () => {
  const [email, setEmail] = useState("");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Pressable
        onPress={() => router.back()}
        style={{ position: "absolute", top: 20, left: 20 }}
      >
        <Back />
      </Pressable>
      <Text style={styles.heading}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        onPress={() => router.push("verifyEmail")}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default getEmail;

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 55,
    width: "100%",
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
});
