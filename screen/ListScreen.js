import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../functions/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const ListScreen = ({ route }) => {
  const { boardId } = route.params;
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    // Fetch lists from Firestore
    const fetchLists = async () => {
      try {
        const q = query(collection(db, 'lists'), where('boardId', '==', boardId));
        const querySnapshot = await getDocs(q);
        const listsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLists(listsData);
      } catch (error) {
        console.error('Error fetching lists:', error);
        alert('Error fetching lists');
      }
    };

    fetchLists();
  }, [boardId]);

  const handleAddList = async () => {
    if (newListName.trim() === '') {
      alert('List name cannot be empty');
      return;
    }

    try {
      await addDoc(collection(db, 'lists'), {
        name: newListName,
        boardId: boardId,
      });

      // Mise à jour directe de l'état local
      setLists(prevLists => [
        ...prevLists,
        { name: newListName, boardId: boardId, id: 'tempId' }, // 'tempId' est un espace réservé
      ]);
      setNewListName('');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Lists for Board {boardId}</Text>
      <TextInput
        style={styles.input}
        placeholder="New List Name"
        value={newListName}
        onChangeText={setNewListName}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddList}>
        <Text style={styles.buttonText}>Add List</Text>
      </TouchableOpacity>
      
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={styles.listName}>{item.name}</Text>
            {/* Add more components like cards here */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    elevation: 2,
  },
  listName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListScreen;
