import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteListScreen from './screens/NoteListScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteList">
        <Stack.Screen name="NoteList" component={NoteListScreen} options={{ title: 'Notes' }} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'Add a Note' }} />
        <Stack.Screen name="EditNote" component={EditNoteScreen} options={{ title: 'Edit a Note' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
