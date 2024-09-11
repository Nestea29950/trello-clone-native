import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../functions/firebase';

const BoardsScreen = ({ navigation }) => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [cardInputs, setCardInputs] = useState({}); // Stocke les champs d'entrée des cartes pour chaque tableau

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
          
          // Récupère les cartes pour chaque tableau
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nouveau board"
        value={newBoardName}
        onChangeText={setNewBoardName}
      />
      <Button title="Add Board" onPress={handleAddBoard} />

      <FlatList
        data={boards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.boardContainer}>
            <TouchableOpacity onPress={() => handleBoardPress(item.id)}>
              <Text style={styles.boardName}>{item.name}</Text>
            </TouchableOpacity>

            {/* Affichage des cartes associées au tableau */}
            <FlatList
              data={item.cards}
              keyExtractor={card => card.id}
              renderItem={({ item: card }) => (
                <View style={styles.cardContainer}>
                  <Text style={styles.cardName}>{card.name}</Text>
                  <Button
                    title="Delete Card"
                    onPress={() => handleDeleteCard(item.id, card.id)}
                    color="red"
                  />
                </View>
              )}
            />

            <TextInput
              style={styles.input}
              placeholder="New Card"
              value={cardInputs[item.id] || ''}
              onChangeText={text => handleCardInputChange(item.id, text)}
            />
            <Button title="Add Card" onPress={() => handleAddCard(item.id)} />
            <Button title="Delete Board" onPress={() => handleDeleteBoard(item.id)} color="red" />
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
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  boardContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  boardName: {
    fontSize: 18,
  },
  cardContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#e4e4e4',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 16,
  },
});

export default BoardsScreen;
