// screens/AddNoteScreen.js
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

const AddEditNoteScreen = ({ navigation, route }) => {
  const { note, loadNotes } = route.params;

  const [client, setClient] = useState("");
  const [clientData, setClientData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const Data = require("../assets/data.json");
    const categories = Data.category;
    const clients = Data.client;

    var count = Object.keys(categories).length;
    let categoryArray = [];
    for (var i = 0; i < count; i++) {
      categoryArray.push({
        value: categories[i].id,
        label: categories[i].name,
      });
    }
    setCategoryData(categoryArray);

    var count = Object.keys(clients).length;
    let clientArray = [];
    for (var i = 0; i < count; i++) {
      clientArray.push({
        value: clients[i].id,
        label: clients[i].name,
      });
    }
    setClientData(clientArray);
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  const addNote = async () => {
    try {
      const newNote = {
        id: Date.now(),
        client,
        category,
        text,
      };

      // Load existing notes
      const existingNotes = await AsyncStorage.getItem("notes");
      let notes = existingNotes ? JSON.parse(existingNotes) : [];

      // Add the new note
      if (
        newNote.text == "" ||
        newNote.client == "" ||
        newNote.category == ""
      ) {
        Alert.alert("One of the field is missing an input value. Please provide all the input values!");
      } else {
        notes.push(newNote);

        // Save updated notes to AsyncStorage
        await AsyncStorage.setItem("notes", JSON.stringify(notes));

        // Trigger the parent component to reload notes
        loadNotes();

        // Navigate back to the note list screen
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ padding: 20, justifyContent: "space-around" }}>
            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={categoryData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setCategory(item.label);
                }}
                renderItem={renderItem}
              />
            </View>

            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={clientData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Client"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setClient(item.label);
                }}
                renderItem={renderItem}
              />
            </View>

            <TextInput
              style={[styles.input]}
              placeholder="Type here..."
              multiline={true}
              value={text}
              onChangeText={(value) => setText(value)}
            />
            <View>
              <TouchableOpacity style={styles.button} onPress={addNote}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AddEditNoteScreen;

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
