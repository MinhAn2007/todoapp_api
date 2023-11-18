import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TakeNoteScreen = () => {
  const route = useRoute();
  const initialUserNotes = route.params?.userNotes || [];
  console.log('initialUserNotes:', initialUserNotes);

  const [userNotes, setUserNotes] = useState(initialUserNotes);
  const [newNote, setNewNote] = useState('');

  console.log('userNotes:', userNotes);

  const addNote = () => {
    if (newNote.trim() !== '') {
      setUserNotes([...userNotes, { id: Date.now().toString(), text: newNote }]);
      setNewNote('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Input and Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú mới"
          onChangeText={text => setNewNote(text)}
          value={newNote}
        />
        <Button title="Thêm" onPress={addNote} />
      </View>

      {/* FlatList */}
      <FlatList
        data={userNotes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
  noteItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});

export default TakeNoteScreen;
