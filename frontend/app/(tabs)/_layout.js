import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";

import HomeIcon from "../../assets/home.svg";
import HomeActiveIcon from "../../assets/home-2.svg";
import CategoriesIcon from "../../assets/category.svg";
import CategoriesActiveIcon from "../../assets/categoryActive.svg";
import CartIcon from "../../assets/shopping-bag.svg";
import CartActiveIcon from "../../assets/shopping-bagActive.svg";
import ProfileIcon from "../../assets/user.svg";
import ProfileActiveIcon from "../../assets/userActive.svg";
import Like from "../../assets/heart.svg";
import LikeActive from "../../assets/heartActive.svg";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "rgb(169, 169, 169)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            // <AntDesign name="home" size={size} color={color} />
            focused ? <HomeIcon /> : <HomeActiveIcon />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ focused }) =>
            focused ? <CategoriesActiveIcon /> : <CategoriesIcon />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "favorites",
          tabBarIcon: ({ focused }) => (focused ? <LikeActive /> : <Like />),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) =>
            focused ? <CartActiveIcon /> : <CartIcon />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileActiveIcon /> : <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 0.18,
    borderTopColor: "grey",
    height: 55,
    paddingBottom: 0,
    paddingTop: 10,
    position: "absolute",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow blur radius for iOS
  },
});
