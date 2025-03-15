import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { View } from "react-native";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarActiveBackgroundColor: "black",
        tabBarIconStyle: {
          marginTop: -5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ size, color }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 0,
    height: 40,
    paddingBottom: 8,
    position: "absolute",
    elevation: 0,
  },
});
// export default function Layout() {
//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         tabBarShowLabel: false,
//         tabBarStyle: styles.tabBar,
//         tabBarIcon: ({ focused }) => {
//           let iconName = route.name === "index" ? "home" : "person";

//           return (
//             <View style={[styles.iconContainer, focused && styles.activeTab]}>
//               <Ionicons
//                 name={iconName}
//                 size={24}
//                 color={focused ? "white" : "black"}
//               />
//             </View>
//           );
//         },
//       })}
//     >
//       <Tabs.Screen name="index" options={{ title: "Home" }} />
//       <Tabs.Screen name="profile" options={{ title: "Profile" }} />

//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: "white",
//     height: 60,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     position: "absolute",
//   },
//   iconContainer: {
//     padding: 10,
//     borderRadius: 25, // Ensures round shape
//   },
//   activeTab: {
//     backgroundColor: "black", // Active tab background
//   },
// });
