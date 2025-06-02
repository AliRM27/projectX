import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useUser } from "../../context/userContext";
import React, { useState } from "react";
import BackArrow from "../../components/BackArrow";
import { router } from "expo-router";
import { updateUser } from "../../services/authApi";

const details = () => {
  const { user, setChanged } = useUser();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");

  const editUser = async () => {
    try {
      const res = await updateUser({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      setChanged((p) => !p);
      res === 200 &&
        Alert.alert("Success", "Your data was changed", [
          {
            text: "Ok",
            onPress: () => router.back(),
          },
        ]);
      !res &&
        Alert.alert("Error", "Your data was not changed", [
          {
            text: "Ok",
          },
        ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <BackArrow />
      <Text style={styles.heading}>Account Details</Text>
      <View style={styles.section}>
        <Text style={styles.title}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
          keyboardType="numbers-and-punctuation"
        />
        <View style={{ position: "absolute", right: 20, bottom: 53 }}>
          <Text style={{ color: "rgb(125, 125, 125)" }}>(Optional)</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setPhone("");
          }}
          activeOpacity={0.6}
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={{ fontSize: 16, color: "red" }}>Remove Number</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 30,
          width: "80%",
          backgroundColor: "black",
          borderRadius: 15,
          height: 50,
          justifyContent: "center",
        }}
        onPress={() => editUser()}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 30,
          width: "80%",
          borderWidth: 1,
          borderColor: "red",
          borderRadius: 15,
          height: 50,
          justifyContent: "center",
        }}
        onPress={() => {
          Alert.alert(
            "Delete Account",
            "Are you sure you want to go?",
            [
              {
                text: "Stay",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Leave",
                onPress: () => console.log("Yes Pressed"),
                style: "destructive",
              },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text
          style={{
            color: "red",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 400,
          }}
        >
          Delete Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginTop: 17,
    gap: 10,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    height: 50,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
});
