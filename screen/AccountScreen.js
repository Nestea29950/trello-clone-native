import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, Image, TouchableOpacity } from 'react-native';
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

  const handleChangeProfilePicture = () => {
    alert('Changer la photo de profil (fonctionnalité à implémenter)');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleChangeProfilePicture}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://www.gravatar.com/avatar/placeholder' }} // Image par défaut
          />
        </TouchableOpacity>
        <Text style={[styles.emailText, { color: isDarkMode ? '#fff' : '#000' }]}>
          {auth.currentUser?.email || 'Utilisateur'}
        </Text>
      </View>

      <View style={styles.preferenceSection}>
        <View style={styles.switchContainer}>
          <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleSwitch} />
        </View>

        <View style={styles.switchContainer}>
          <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Notifications</Text>
          <Switch value={false} disabled /> 
        </View>
      </View>

      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: isDarkMode ? '#444' : '#0079bf' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.editProfileButton, { backgroundColor: isDarkMode ? '#444' : '#0079bf' }]} onPress={() => alert('Modifier le profil (fonctionnalité à implémenter)')}>
        <Text style={styles.buttonText}>Modifier le profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#0079bf',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  preferenceSection: {
    width: '100%',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  editProfileButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
