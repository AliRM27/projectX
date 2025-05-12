import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import HomeIcon from "../../assets/svgs/home.svg";
import HomeActiveIcon from "../../assets/svgs/home-2.svg";
import CategoriesIcon from "../../assets/svgs/category.svg";
import CategoriesActiveIcon from "../../assets/svgs/categoryActive.svg";
import CartIcon from "../../assets/svgs/shopping-bag.svg";
import CartActiveIcon from "../../assets/svgs/shopping-bagActive.svg";
import ProfileIcon from "../../assets/svgs/user.svg";
import ProfileActiveIcon from "../../assets/svgs/userActive.svg";
import Like from "../../assets/svgs/heart.svg";
import LikeActive from "../../assets/svgs/heartActive.svg";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "rgb(169, 169, 169)",
        sceneStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
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
