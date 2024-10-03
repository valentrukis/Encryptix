import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Icon } from "@/components/Icon";
import * as DocumentPicker from "expo-document-picker";

export default function Encryption() {

  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.imageLogo}
          source={require("@/assets/images/encryptix_logo.png")}
        />
      </View>
      <View style={styles.headerContainer}>
        <View>
          <ThemedText type="title">Encryption</ThemedText>
        </View>
        <View>
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
          <TouchableOpacity style={styles.fileInput} onPress={ async () => {
            try {
              let file = await DocumentPicker.getDocumentAsync()

              console.log(file)

            } catch (error) {
              console.log(error)
            }
          }}>
            <Icon name="document-outline" />
            <Text>{}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            
          }}>
            <Text>Check File</Text>
          </TouchableOpacity>
          {/* <View style={styles.fileInput}>
            
          </View> */}
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
    backgroundColor: "#fff",
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
