import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { auth } from '../functions/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={{ uri: 'https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png' }} // Un fond subtil, peut être remplacé par un dégradé
    >
      <View style={styles.container}>
        <Text style={styles.title}>Se connecter</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupButtonText}>Créer un compte</Text>
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
  loginButton: {
    backgroundColor: '#0079bf',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signupButton: {
    borderColor: '#0079bf',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 8,
  },
  signupButtonText: {
    color: '#0079bf',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
