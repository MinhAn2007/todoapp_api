import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const TakeNoteScreen = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [priority, setPriority] = useState('red');
  const route = useRoute();

  useEffect(() => {
    fetchUserNotes(route.params);
  }, [route.params]);

  const fetchUserNotes = async (userId) => {
    try {
      const apiUrl = `http://localhost:3000/note?user_id=${userId.id}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setUserNotes(data);
        console.log('data:', data);
      } else {
        console.error('Failed to fetch user notes. Server returned:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user notes:', error.message);
    }
  };

  const addNote = async () => {
    if (newNote.trim() !== '') {
      const userId = route.params.id;
      const newNoteObject = { id: Date.now().toString(), title: newNote, completed: false, user_id: userId, priority: priority };

      setUserNotes((prevNotes) => [...prevNotes, newNoteObject]);

      const apiUrl = 'http://localhost:3000/note';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNoteObject),
        });

        if (!response.ok) {
          console.error('Failed to add note. Server returned:', response.status);
        }
      } catch (error) {
        console.error('Error adding note:', error.message);
      }

      setNewNote('');
      setPriority('red'); // Reset priority after adding a new note
    }
  };

  const updateNote = async () => {
    if (selectedNote && newNote.trim() !== '') {
      const updatedNote = { ...selectedNote, title: newNote, priority: priority };

      setUserNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === selectedNote.id ? updatedNote : note))
      );

      const apiUrl = `http://localhost:3000/note/${selectedNote.id}`;

      try {
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });

        if (!response.ok) {
          console.error('Failed to update note. Server returned:', response.status);
        }
      } catch (error) {
        console.error('Error updating note:', error.message);
      }

      setSelectedNote(null);
      setNewNote('');
      setPriority('red'); // Reset priority after updating a note
    }
  };

  const deleteNote = async (noteId) => {
    const apiUrl = `http://localhost:3000/note/${noteId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUserNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      } else {
        console.error('Failed to delete note. Server returned:', response.status);
      }
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setNewNote(note.title);
    setPriority(note.priority);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú mới"
          onChangeText={(text) => setNewNote(text)}
          value={newNote}
        />
        <View style={styles.priorityRadioGroup}>
          <Text>Priority:</Text>
          <View style={styles.radioButtons}>
            <RadioButton
              value="red"
              status={priority === 'red' ? 'checked' : 'unchecked'}
              onPress={() => setPriority('red')}
            />
            <Text>Red</Text>
          </View>
          <View style={styles.radioButtons}>
            <RadioButton
              value="orange"
              status={priority === 'orange' ? 'checked' : 'unchecked'}
              onPress={() => setPriority('orange')}
            />
            <Text>Orange</Text>
          </View>
          <View style={styles.radioButtons}>
            <RadioButton
              value="green"
              status={priority === 'green' ? 'checked' : 'unchecked'}
              onPress={() => setPriority('green')}
            />
            <Text>Green</Text>
          </View>
        </View>
        <Button title={selectedNote ? 'Cập nhật' : 'Thêm'} onPress={selectedNote ? updateNote : addNote} />
      </View>

      <FlatList
  data={userNotes}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.noteItemRow}>
      <Text>{item.title}</Text>
      <Text>Priority: {item.priority}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sửa" onPress={() => handleEdit(item)} />
        <Button title="Xóa" onPress={() => deleteNote(item.id)} />
      </View>
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
    flexDirection: 'column',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  priorityRadioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  noteItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  noteItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default TakeNoteScreen;
