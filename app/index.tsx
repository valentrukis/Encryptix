import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useState } from "react";

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
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="********"
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(email, password);
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
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
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
});
