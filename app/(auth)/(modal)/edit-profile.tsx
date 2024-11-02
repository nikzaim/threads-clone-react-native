import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";

export default function EditProfile() {
  const { biostring, linkstring, userId, imageUrl } = useLocalSearchParams<{
    biostring: string;
    linkstring: string;
    userId: string;
    imageUrl: string | any;
  }>();
  console.log(biostring, linkstring, userId, imageUrl);
  const [bio, setBio] = useState(biostring);
  const [link, setLink] = useState(linkstring);
  const updateUser = useMutation(api.users.updateUser);
  const generateUploadUrl = useMutation(api.users.generateUploadUrl);

  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(null);

  const onDone = async () => {
    let storageId = null;
    if (selectedImage) {
      storageId = await updateProfilePicture();
    }
    await updateUser({
      _id: userId as Id<"users">,
      bio,
      websiteUrl: link,
      imageUrl: selectedImage ? (storageId as Id<"_storage">) : imageUrl,
    });
    router.dismiss();
  };

  const updateProfilePicture = async () => {
    const uploadUrl = await generateUploadUrl();

    const response = await fetch(selectedImage!.uri);
    const blob = await response.blob();

    const result = await fetch(uploadUrl, {
      method: "POST",
      body: blob,
      headers: {
        "Content-Type": selectedImage?.mimeType!,
      },
    });

    const { storageId } = await result.json();
    return storageId;
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={onDone}>
              <Text>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <TouchableOpacity onPress={pickImage}>{selectedImage ? <Image source={{ uri: selectedImage.uri }} style={styles.image} /> : <Image source={{ uri: imageUrl }} style={styles.image} />}</TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.label}>Bio</Text>
        <TextInput value={bio} onChangeText={setBio} placeholder="Write a bio..." numberOfLines={4} multiline textAlignVertical="top" style={styles.bioInput} />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Link</Text>
        <TextInput value={link} onChangeText={setLink} placeholder="Link" autoCapitalize="none" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.icon,
    borderRadius: 4,
    padding: 8,
    margin: 16,
  },
  bioInput: {
    height: 100,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
});
