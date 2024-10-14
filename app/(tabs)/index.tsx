import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.imageLogo}
          source={require("@/assets/images/encryptix_logo.png")}
        />
      </View>
      <View style={styles.mainContainer}>
        <View>
          <ThemedText type="title">
            Welcome to <ThemedText type="subtitle">Encryptix</ThemedText>
          </ThemedText>
          <ThemedText style={{ marginTop: 8 }}>
            Where the encryption becomes easy
          </ThemedText>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              // router.navigate("/encryption");
              const token = await AsyncStorage.getItem("accessToken");
              console.log("token: " + token);
            }}
          >
            <Text style={styles.buttonText}>Start Encrypting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 250,
    overflow: "hidden",
  },
  imageLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  mainContainer: {
    marginTop: 32,
  },
  button: {
    backgroundColor: "#629B52",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 38,
    alignSelf: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
});
