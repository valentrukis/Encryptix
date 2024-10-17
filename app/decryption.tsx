import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

// Decryption Function
const decryptFile = async (encryptedFileUri, password) => {
  try {
    // Leer el archivo encriptado
    const encryptedContent = await FileSystem.readAsStringAsync(encryptedFileUri);

    // Crear un hash seguro de la contraseña para usar como clave
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    // Desencriptar el contenido
    const decryptedContents = await Crypto.decryptAsync(
      Crypto.CryptoEncryptionAlgorithm.AES, encryptedContent
    );

    const decryptedxd = await Crypto.CryptoEncoding(Crypto.CryptoDigestAlgorithm.SHA256, encryptedContent)

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
      <TextInput
        style={styles.input}
        placeholder="Enter password to decrypt"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <Pressable style={styles.button} onPress={handleDecryption}>
        <Text style={styles.buttonText}>Decrypt</Text>
      </Pressable>

      {decryptedContent ? (
        <Text>Decrypted Content: {decryptedContent}</Text>
      ) : (
        <Text>No content decrypted yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Define styles here
});
