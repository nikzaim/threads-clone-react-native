import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modal)/create" options={{ presentation: "modal", title: "New Feed", headerRight: () => <Ionicons name="ellipsis-horizontal-circle" size={24} /> }} />
    </Stack>
  );
};

export default Layout;
