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

import { createUser } from "./req/users";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
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
            <ThemedText type="subtitle">Sign Up</ThemedText>
          </ThemedText>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="John"
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            placeholder="Doe"
            onChangeText={(lastName) => setLastName(lastName)}
          />
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
          onPress={async () => {
            const res = await createUser({ name, lastName, email, password });
            console.log(res);
            if (res && res._id) {
              console.log("Account Successfully Created");
              router.back();
            } else {
              console.log("Login failed");
            }
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Pressable onPress={() => {
          router.navigate('/')
        }} >
          <Text style={styles.linkText}>
            Already have an account?, Log In Here
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
