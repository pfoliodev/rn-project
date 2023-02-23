import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
   const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigation.replace("Product")
      } 
    });
    return unsubscribe;
  }, [])

  const auth = getAuth();

  const handleSignUp = () => {

    const emailRegex = /\S+@\S+\.\S+/;
    
    if (!emailRegex.test(email)) {
        ToastAndroid.show("Email Invalide", ToastAndroid.SHORT);
        return false;
    }

    if (password.length < 6) {
        ToastAndroid.show("Le mot de passe doit contenir au moins 6 charactères", ToastAndroid.SHORT);
        return false;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') ToastAndroid.show("Email déjà utilisé", ToastAndroid.SHORT);
      console.log("Error:", errorMessage);
    });
  }

  const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      ToastAndroid.show("Vous êtes à présent connecté : " + user.email, ToastAndroid.SHORT);
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: 80,
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#000',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#000',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
})