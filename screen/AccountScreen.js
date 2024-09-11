// AccountScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { auth } from '../functions/firebase'; // Assurez-vous d'importer firebase auth

const AccountScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
        alert('Failed to logout: ' + error.message);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Account Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleSwitch} />
      </View>
      <Button title="Logout" onPress={handleLogout} color={isDarkMode ? '#fff' : '#000'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AccountScreen;
