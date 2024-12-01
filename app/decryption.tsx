import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

// Decryption Function
const decryptFile = async (encryptedFileUri, password) => {
  try {
    // Leer el archivo encriptado
    const encryptedContent = await FileSystem.readAsStringAsync(
      encryptedFileUri
    );

    // Crear un hash seguro de la contraseña para usar como clave
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    // Desencriptar el contenido
    const decryptedContents = await Crypto.decryptAsync(
      Crypto.CryptoEncryptionAlgorithm.AES,
      encryptedContent
    );

    const decryptedxd = await Crypto.CryptoEncoding(
      Crypto.CryptoDigestAlgorithm.SHA256,
      encryptedContent
    );

    console.log("File decrypted successfully.");
    return decryptedxd;
  } catch (error) {
    console.log("Error during file decryption:", error);
  }
};

export default function DecryptionScreen() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [decryptedContent, setDecryptedContent] = useState("");

  const handleDecryption = async () => {
    const encryptedFileUri = FileSystem.documentDirectory + "encryptedFile.txt";
    const content = await decryptFile(encryptedFileUri, password);
    setDecryptedContent(content);
  };

  return (
    <View>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter password to decrypt"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      /> */}

      <Pressable style={styles.button} onPress={handleDecryption}>
        <Text style={styles.buttonText}>Decrypt</Text>
      </Pressable>

      {decryptedContent ? (
        <Text>Decrypted Content: {decryptedContent}</Text>
      ) : (
        <Text style={styles.text}>No content decrypted yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Define styles here
  input: {
    backgroundColor: "#d9d9d9",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#629B52",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 38,
    alignSelf: "center",
    marginTop: 64,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
  text: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    marginHorizontal: 38,
    marginTop: 8
  }
});
