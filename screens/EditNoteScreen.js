// screens/EditNoteScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const EditNoteScreen = ({ route, navigation }) => {
  const { note, loadNotes } = route.params;

  const [client, setClient] = useState(note.client);
  const [category, setCategory] = useState(note.category);
  const [value, setValue] = useState(null);
  const [text, setText] = useState(note.text);

  const saveNote = async () => {
    try {
      const updatedNote = {
        ...note,
        client,
        category,
        text,
      };

      let existingNotes = await AsyncStorage.getItem("notes");
      existingNotes = existingNotes ? JSON.parse(existingNotes) : [];

      // Find the index of the note to be updated
      const index = existingNotes.findIndex((n) => n.id === note.id);

      if (updatedNote.text == "") {
        Alert.alert(
          "Text field cannot be empty. Please proivde some value before saving the note!"
        );
      } else {
        // Replace the old note with the updated one
        existingNotes[index] = updatedNote;

        await AsyncStorage.setItem("notes", JSON.stringify(existingNotes));

        // Trigger the parent component to reload notes
        loadNotes();

        // Navigate back to the note list screen
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ padding: 20, justifyContent: "space-around" }}>
            <Text style={{ fontWeight: "600" }}>Category: {category}</Text>
            <Text style={{ fontWeight: "600", marginVertical: 7 }}>
              Client: {client}
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="Type here..."
              multiline={true}
              value={text}
              onChangeText={(value) => setText(value)}
            />
            <View>
              <TouchableOpacity style={styles.button} onPress={saveNote}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    //margin: 16,
    marginBottom: 15,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#4e86cc",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  addNoteContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 20,
    paddingTop: 20,
    width: "100%",
    fontSize: 19,
    color: "black",
    fontWeight: "600",
    opacity: 0.8,
    shadowColor: "#4e86cc",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderColor: "#4e86cc",
    borderWidth: 2,
    borderRadius: 5,
    height: 300,
  },
  button: {
    padding: 5,
    backgroundColor: "#4e86cc",
    width: "40%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: "40",
    alignSelf: "flex-end",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default EditNoteScreen;
