import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useCallback } from "react";
import { fetchUser } from "../../services/api.js";
import { useFocusEffect } from "expo-router";
import { logoutUser } from "../../services/authApi.js";
import { useUser } from "../../context/userContext.js";
import { useQuery } from "@tanstack/react-query";
import Setting from "../../components/Setting.jsx";
import User from "../../assets/svgs/user.svg";
import Card from "../../assets/svgs/card.svg";
import Location from "../../assets/svgs/location.svg";
import Notification from "../../assets/svgs/notification.svg";
import Global from "../../assets/svgs/global.svg";
import Info from "../../assets/svgs/info-circle.svg";
import Call from "../../assets/svgs/call.svg";

export default function profile() {
  const { setUser: setUserContext } = useUser();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    onError: (error) => {
      console.error("Failed to fetch user data", error);
    },
  });

  const logOut = async () => {
    try {
      await logoutUser(setUserContext);
    } catch (error) {
      console.error("Failed to logout");
      throw error;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { justifyContent: "flex-start" }]}>
      <Text style={styles.heading}>My Account</Text>
      <ScrollView
        style={{ width: "90%", marginTop: 40 }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%" }}>
          <Text style={styles.h2}>General</Text>
          <Setting name={"Account Details"} Icon={User} link={"details"} />
          <Setting name={"Payment Method"} Icon={Card} link={"payment"} />
          <Setting name={"Location"} Icon={Location} link={"location"} />
        </View>
        <View style={{ marginTop: 20, width: "100%" }}>
          <Text style={styles.h2}>Setting</Text>
          <Setting
            name={"Notifications"}
            Icon={Notification}
            link={"notification"}
          />
          <Setting name={"Language"} Icon={Global} link={"language"} />
          <Setting
            name={"Privacy & Policy"}
            Icon={Info}
            link={"privacyPolicy"}
          />
          <Setting name={"Contact Us"} Icon={Call} link={"contactUs"} />
        </View>
        <View style={{ marginTop: 10, width: "100%" }}>
          <Button
            title="Logout"
            onPress={logOut}
            color="#FF0000"
            accessibilityLabel="Logout"
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#FF0000",
              borderRadius: 5,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
