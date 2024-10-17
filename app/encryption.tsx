import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Icon } from "@/components/Icon";
import * as DocumentPicker from "expo-document-picker";
import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

// Encryption Function using expo-crypto
const encryptFile = async (fileUri) => {
  try {
    console.log("Reading file content from:", fileUri);

    // Read the file content as base64
    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log("File content read successfully.");

    // Generate a hash (SHA-256) of the file content as a simple form of encryption
    const encryptedContent = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      fileContent
    );
    console.log("File encrypted (hashed) successfully.");

    // Save the encrypted (hashed) content
    const encryptedFileUri = FileSystem.documentDirectory + "encryptedFile.txt";
    await FileSystem.writeAsStringAsync(encryptedFileUri, encryptedContent);
    console.log("Encrypted file saved to:", encryptedFileUri);

    return encryptedFileUri;
  } catch (error) {
    console.log("Error during encryption:", error);
    throw error;
  }
};

export default function Encryption() {
  const [file, setFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type === "cancel") {
        console.log("Document picking cancelled.");
        return;
      }
      setFile(result);
      console.log("File selected:", result);
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const handleEncrypt = async () => {
    try {
      if (!file || !file.assets[0].uri) {
        console.log("No file selected for encryption.");
        return;
      }
      console.log("Encrypting file with URI:", file.assets[0].uri);
      const encryptedFileUri = await encryptFile(file.assets[0].uri);
      console.log("Encrypted file path:", encryptedFileUri);
    } catch (error) {
      console.log("Error during file encryption:", error);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.imageLogo}
          source={require("@/assets/images/encryptix_logo.png")}
        />
      </View>
      <View style={styles.headerContainer}>
        <ThemedText type="title">Encryption</ThemedText>
        <ThemedText
          style={{
            marginTop: 32,
            textAlign: "left",
            fontSize: 16,
            fontFamily: "Montserrat_400Regular",
          }}
        >
          To start, first select the file you want to encrypt:
        </ThemedText>

        {/* Botón para seleccionar archivo */}
        <TouchableOpacity style={styles.fileInput} onPress={pickDocument}>
          <Icon name="document-outline" size={38} />
        </TouchableOpacity>

        {/* Mostrar información del archivo seleccionado */}
        {file && (
          <View>
            <Text>File Name: {file.assets[0].name}</Text>
            <Text>File URI: {file.assets[0].uri}</Text>
          </View>
        )}

        {/* Botón para encriptar el archivo */}
        <View>
          <Pressable style={styles.button} onPress={handleEncrypt}>
            <Text style={styles.buttonText}>Encrypt</Text>
          </Pressable>
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
  headerContainer: {
    marginTop: 32,
    paddingHorizontal: 32,
  },
  fileInput: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#629B52",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 38,
    marginTop: 32,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
});
