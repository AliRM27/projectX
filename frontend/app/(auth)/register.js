import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { registerUser } from "../../services/authApi.js"; // Import API function
import { router } from "expo-router";
import Google from "../../assets/svgs/google.svg";
import Apple from "../../assets/svgs/apple.svg";

const RegisterScreen = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password) {
      setError("All fields are required");
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      setIsError(false);
      router.replace("login");
    } catch (error) {
      setError(error);
      setIsError(true);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <View style={{ gap: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.fullName}
          onChangeText={(text) => handleChange("fullName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        {isError && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
            {error}
          </Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
          marginVertical: 30,
        }}
      >
        <View style={{ width: "35%", height: 1, backgroundColor: "#ccc" }} />
        <Text style={{ color: "grey" }}>Or sign in with</Text>
        <View style={{ width: "35%", height: 1, backgroundColor: "#ccc" }} />
      </View>
      <View style={{ gap: 25 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 20,
            alignItems: "center",
            height: 55,
          }}
          activeOpacity={0.6}
        >
          <Google style={{ marginHorizontal: 40 }} width={25} height={25} />
          <Text style={{ color: "grey", fontWeight: "600", fontSize: 16 }}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 20,
            alignItems: "center",
            height: 55,
          }}
          activeOpacity={0.6}
        >
          <Apple style={{ marginHorizontal: 40 }} width={25} height={25} />
          <Text style={{ color: "grey", fontWeight: "600", fontSize: 16 }}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("login")}
        activeOpacity={0.5}
        style={{ marginTop: 40 }}
      >
        <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "bold", color: "black" }}>Sing In.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  input: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 55,
    width: "100%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
