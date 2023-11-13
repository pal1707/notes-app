// screens/NoteListScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Cross } from "lucide-react-native";
import { Trash, Edit } from "lucide-react-native";

const NoteListScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Load notes from AsyncStorage when the component mounts
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes !== null) {
        const reversedNotes = JSON.parse(storedNotes).reverse();
        setNotes(reversedNotes);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
        Alert.alert("Delete", "Are you sure you want to delete the note?", [
            {
              text: "No",
              onPress: () => console.log("No Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                const updatedNotes = notes.filter((note) => note.id !== id);
                AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
                setNotes(updatedNotes);
              },
            },
          ]);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <View style={[styles.notesContainer]}>
        <View style={[styles.headingConatiner]}>
          <Text style={styles.heading}>Your Notes...</Text>

          {/* Add your Notes */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.button, { marginLeft: 40 }]}
              onPress={() => navigation.navigate("AddNote", { loadNotes })}
            >
              <Cross color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Total Notes count */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "700", fontSize: 18, color: "#4e86cc" }}>
            Total: {notes.length}
          </Text>
        </View>


        <View style={styles.divider}></View>

        <View>
          {notes.length > 0 ? (
            <FlatList
              data={notes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={styles.note}>
                    <Text style={styles.text}>{item.text}</Text>
                  </View>

                  <Text style={{ fontWeight: "600", marginTop: 7 }}>
                    Category: {item.category}
                  </Text>
                  <Text style={{ fontWeight: "600", marginTop: 7 }}>
                    Client: {item.client}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "column" }}
                      onPress={() => deleteNote(item.id)}
                    >
                      <Text style={styles.delete}>
                        <Trash size={18} color="#4e86cc" />
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EditNote", {
                          note: item,
                          loadNotes,
                        })
                      }
                    >
                      <Edit color="#4e86cc" size={18} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text>No notes available</Text>
          )}
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  notesContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 170,
    opacity: 0.9,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#4e86cc",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#4e86cc",
    marginTop: 5,
    marginBottom: 5,
  },
  item: {
    marginBottom: 20,
    padding: 15,
    color: "black",
    opacity: 0.8,
    marginTop: 10,
    shadowColor: "#4e86cc",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderColor: "#4e86cc",
    borderWidth: 2,
    borderRadius: 15,
    borderWidth: 2,
  },
  index: {
    fontSize: 20,
    fontWeight: "800",
  },
  headingConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4e86cc",
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
  },
  scollView: {
    marginBottom: 70,
  },
  note: {
    flexDirection: "row",
    width: "75%",
  },
  text: {
    fontWeight: "700",
    fontSize: 17,
    alignSelf: "center",
  },
  delete: {
    color: "#4e86cc",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 20,
    width: "65%",
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  searchButton: {
    backgroundColor: "#4e86cc",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    borderRadius: 5,
    height: 40,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
  emptyNoteContainer: {
    alignItems: "center",
    marginTop: 240,
  },
  emptyNoteText: {
    color: "black",
    fontWeight: "600",
    fontSize: 15,
  },
  dateContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default NoteListScreen;
