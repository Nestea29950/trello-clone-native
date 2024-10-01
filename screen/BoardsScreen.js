import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { collection, addDoc, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../functions/firebase';

const BoardsScreen = ({ navigation }) => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [cardInputs, setCardInputs] = useState({});

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const q = query(collection(db, 'boards'));
      const querySnapshot = await getDocs(q);
      const boardsData = await Promise.all(
        querySnapshot.docs.map(async doc => {
          const boardData = { id: doc.id, ...doc.data() };
          const cardsQuery = query(collection(db, 'boards', doc.id, 'cards'));
          const cardsSnapshot = await getDocs(cardsQuery);
          const cardsData = cardsSnapshot.docs.map(cardDoc => ({ id: cardDoc.id, ...cardDoc.data() }));
          return {
            ...boardData,
            cards: cardsData,
          };
        })
      );
      setBoards(boardsData);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch boards: ' + error.message);
    }
  };

  const handleAddBoard = async () => {
    if (newBoardName.trim() === '') {
      alert('Board name cannot be empty');
      return;
    }
    try {
      await addDoc(collection(db, 'boards'), { name: newBoardName });
      setNewBoardName('');
      fetchBoards();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleAddCard = async (boardId) => {
    const cardName = cardInputs[boardId];
    if (cardName.trim() === '') {
      alert('Card name cannot be empty');
      return;
    }
    try {
      const boardRef = doc(db, 'boards', boardId);
      await addDoc(collection(boardRef, 'cards'), { name: cardName });
      setCardInputs(prev => ({ ...prev, [boardId]: '' }));
      fetchBoards();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteDoc(doc(db, 'boards', boardId));
      fetchBoards();
    } catch (error) {
      console.log(error);
      alert('Failed to delete board: ' + error.message);
    }
  };

  const handleDeleteCard = async (boardId, cardId) => {
    try {
      await deleteDoc(doc(db, 'boards', boardId, 'cards', cardId));
      fetchBoards();
    } catch (error) {
      console.log(error);
      alert('Failed to delete card: ' + error.message);
    }
  };

  const handleBoardPress = (boardId) => {
    navigation.navigate('Cards', { boardId });
  };

  const handleCardInputChange = (boardId, text) => {
    setCardInputs(prev => ({ ...prev, [boardId]: text }));
  };

  return (
    <ImageBackground
      style={styles.background}
      source={{ uri: 'https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png' }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nouveau board"
          value={newBoardName}
          onChangeText={setNewBoardName}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBoard}>
          <Text style={styles.addButtonText}>Ajouter un Board</Text>
        </TouchableOpacity>

        <FlatList
          data={boards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.boardContainer}>
              <TouchableOpacity onPress={() => handleBoardPress(item.id)}>
                <Text style={styles.boardName}>{item.name}</Text>
              </TouchableOpacity>

              <FlatList
                data={item.cards}
                keyExtractor={card => card.id}
                renderItem={({ item: card }) => (
                  <View style={styles.cardContainer}>
                    <Text style={styles.cardName}>{card.name}</Text>
                    <TouchableOpacity onPress={() => handleDeleteCard(item.id, card.id)}>
                      <Text style={styles.deleteText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              <TextInput
                style={styles.input}
                placeholder="Nouvelle Card"
                value={cardInputs[item.id] || ''}
                onChangeText={text => handleCardInputChange(item.id, text)}
              />
              <TouchableOpacity style={styles.addButton} onPress={() => handleAddCard(item.id)}>
                <Text style={styles.addButtonText}>Ajouter une card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBoard(item.id)}>
                <Text style={styles.deleteButtonText}>Supprimer le Board</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f7f7f7',
  },
  addButton: {
    backgroundColor: '#0079bf',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boardContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  boardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0079bf',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e4e4e4',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  cardName: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BoardsScreen;
