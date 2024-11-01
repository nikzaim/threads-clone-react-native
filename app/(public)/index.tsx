import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { useOAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const loginImage = require("@/assets/images/login.png");

export default function Index() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_facebook" });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleFacebookLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log(createdSessionId);
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();
      console.log(createdSessionId);
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={loginImage} style={styles.loginImage} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>How would you like to use Threads?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleFacebookLogin}>
            <View style={styles.loginButtonContent}>
              <Image source={require("@/assets/images/instagram_icon.webp")} style={styles.loginButtonIcon}></Image>
              <Text style={styles.loginButtonText}>Continue with Instagram</Text>
              <Ionicons name={"chevron-forward"} size={24} color={Colors.light.icon} />
            </View>
            <Text style={styles.loginButtonSubtitle}>Log in or create a Threads profile with your Instagram account. With a profile, you can post, interact and get personalised recommendations.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleGoogleLogin}>
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Continue with Google</Text>
              <Ionicons name={"chevron-forward"} size={24} color={Colors.light.icon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}>
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>Use without a profile</Text>
              <Ionicons name={"chevron-forward"} size={24} color={Colors.light.icon} />
            </View>
            <Text style={styles.loginButtonSubtitle}>You can browse Threads without a profile, but won't be able to post, interact or get personalised recommendations.</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("(auth)/(tabs)")}>
            <Text style={styles.switchAccountButtonText}>Switch accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.switchAccountButtonText}>Switch accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.switchAccountButtonText}>Switch accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.switchAccountButtonText}>Switch accounts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loginImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
  },
  loginButton: {
    backgroundColor: Colors.white,
    padding: 20,
    gap: 8,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loginButtonIcon: {
    width: 50,
    height: 50,
  },
  loginButtonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    flex: 1,
  },
  loginButtonSubtitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: "#bcbcbc",
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 20,
  },
  switchAccountButtonText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 15,
    color: "#000",
    textAlign: "center",
  },
});
