import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { loginUser } from "../../services/authApi.js";
import { useGoogleAuth } from "../../services/googleAuth.js";
import { router } from "expo-router";
import { useUser } from "../../context/userContext.js";
import Google from "../../assets/svgs/google.svg";
import Apple from "../../assets/svgs/apple.svg";

const LoginScreen = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const { setUser } = useUser();
  const { handleGoogleSignIn, isGoogleSignInReady } = useGoogleAuth();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginUser(form, setUser);
      setError(response.message);
      router.replace("../(tabs)");
    } catch (error) {
      if (error.isEmailVerified === false) {
        Alert.alert("Email Not Verified", error.message, [
          {
            text: "OK",
            onPress: () => {
              // You can add additional actions here if needed
            },
          },
        ]);
      } else {
        setError(error.message || "Login failed");
        setIsError(true);
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await handleGoogleSignIn(setUser);
      if (result.success) {
        router.replace("../(tabs)");
      } else {
        setError(result.error);
        setIsError(true);
      }
    } catch (error) {
      setError(error.message);
      setIsError(true);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 30, alignItems: "flex-start", gap: 15 }}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.title}>Sing In</Text>
      </View>

      <View style={{ gap: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <Pressable onPress={() => router.push("(resetPassword)")}>
          <Text
            style={{ fontSize: 16, fontWeight: 500, alignSelf: "flex-end" }}
          >
            Forget Password?
          </Text>
        </Pressable>
        {isError && (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
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

      <View style={{ gap: 15 }}>
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
          onPress={handleGoogleLogin}
          disabled={!isGoogleSignInReady || loading}
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
        onPress={() => router.replace("register")}
        activeOpacity={0.5}
        style={{ marginTop: 40 }}
      >
        <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "bold", color: "black" }}>Sing Up.</Text>
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
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  linkText: { textAlign: "center", color: "#007bff", marginTop: 15 },
});

export default LoginScreen;
