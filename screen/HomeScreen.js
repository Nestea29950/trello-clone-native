import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  
  // Dummy function for logout
  const handleLogout = () => {
    console.log('Logout button pressed');
    // Here you would typically handle logout logic, e.g., signOut(auth)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to TrelloClone!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
