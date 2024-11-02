import { Colors } from "@/constants/Colors";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserProfile from "./UserProfile";
import Tabs from "./Tabs";

type ProfileProps = {
  userId: Id<"users">;
  showBackButton?: boolean;
};

const Profile = ({ userId, showBackButton = true }: ProfileProps) => {
  const { userProfile } = useUserProfile();
  const { top } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const router = useRouter();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlatList
        data={[]}
        renderItem={({ item }) => <Text>Test</Text>}
        ListEmptyComponent={<Text style={styles.tabContentText}>You haven't posted anything yet.</Text>}
        ItemSeparatorComponent={() => <View style={{ height: StyleSheet.hairlineWidth }} />}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              {showBackButton ? (
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={24} color="#000" />
                  <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
              ) : (
                <MaterialCommunityIcons name="web" size={24} />
              )}
              <View style={styles.headerIcons}>
                <Ionicons name="logo-instagram" size={24} color="black" />
                <TouchableOpacity onPress={() => signOut()}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {userId && <UserProfile userId={userId} />}
            {!userId && userProfile && <UserProfile userId={userProfile?._id} />}
            <Tabs onTabChange={() => {}} />
          </>
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.light.icon,
    alignSelf: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backText: {
    fontSize: 16,
  },
});
