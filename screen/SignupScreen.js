import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { auth } from '../functions/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={{ uri: 'https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png' }} // Fond subtil
    >
      <View style={styles.container}>
        <Text style={styles.title}>Créer un compte</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Créer un compte !</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Tu as déja un compte ? Connecte toi !</Text>
        </TouchableOpacity>
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
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0079bf',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f7f7f7',
  },
  signupButton: {
    backgroundColor: '#0079bf',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginButton: {
    borderColor: '#0079bf',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#0079bf',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SignupScreen;
