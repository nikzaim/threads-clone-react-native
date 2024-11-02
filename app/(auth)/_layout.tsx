import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const Layout = () => {
  const router = useRouter();
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
      <Stack.Screen
        name="(modal)/edit-profile"
        options={{
          presentation: "modal",
          title: "Edit Profile",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
