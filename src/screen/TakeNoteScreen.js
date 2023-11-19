import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TakeNoteScreen = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const route = useRoute();
  console.log(route.params);
  useEffect(() => {
    fetchUserNotes(route.params);
    console.log('useEffect');
  }, [route.params]);

  const fetchUserNotes = async (userId) => {
    console.log(userId);
    try {
      const apiUrl = `http://localhost:3000/note?user_id=${userId.id}`;
      console.log(apiUrl);
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const data = await response.json();
        setUserNotes(data);  
      } else {
        console.error('Failed to fetch user notes. Server returned:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user notes:', error.message);
    }
  };

  const addNote = async  () => {
    if (newNote.trim() !== '') {
      const userId = route.params.id;
      const newNoteObject = { id: Date.now().toString(), title: newNote, completed: false, userId: userId };
  
      setUserNotes((prevNotes) => [...prevNotes, newNoteObject]);
  
      const apiUrl = `http://localhost:3000/note`;
  
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
    }
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
        <Button title="Thêm" onPress={addNote} />
      </View>

      <FlatList
        data={userNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text>{item.title}</Text>
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
