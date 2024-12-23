import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logUser } from "./req/users";

export default function Index() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <ThemedText type="subtitle">Log In</ThemedText>
          </ThemedText>
          <ThemedText style={{ marginTop: 8 }}>Let's get started</ThemedText>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="email@example.com"
            onChangeText={(email) => setEmail(email)}
            inputMode="email"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="********"
            onChangeText={(password) => setPassword(password)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            console.log(email, password);

            if(!email && !password) {
              alert('Please fill the blank fields')
            }

            const res = await logUser({ email, password });
            if (res && res.accessToken) {
              console.log("Login Successful");

              await AsyncStorage.setItem("accessToken", res.accessToken);
              console.log("Token saved successfully!");
              router.navigate("/(tabs)");
            } else {
              console.log("Login failed");
            }
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Pressable onPress={() => {
          router.navigate('/signup')
        }}>
          <Text style={styles.linkText}>
            Don't have an account?, Register Here
          </Text>
        </Pressable>
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
    marginHorizontal: 64,
  },
  inputBox: {
    marginTop: 16,
  },
  input: {
    backgroundColor: "#d9d9d9",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    marginTop: 8,
  },
  inputText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
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
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  linkText: {
    color: "#629B52",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 16,
    marginTop: 8,
  },
});
