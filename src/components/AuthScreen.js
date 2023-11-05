import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import app from "../services/auth";
const auth = getAuth(app);

const AuthScreen = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  // if isSignUpPage is true, then we are sigining a user up
  const [isSignUpPage, setIsSignUpPage] = useState(true);

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // TODO: Show a snackbar to the user if sign up is successfull
        // TODO: Redirect a user to an onboarding page after they create
        // their account.
      })
      .catch((error) => {
        // TODO: Show an error message to the user if an error occurs
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // display a snackbar that says that sign in is successful
      })
      .catch((error) => {
        // display a snackbar that shows an error message
      });
  }

  return (
    <SafeAreaView>
      <Text>FinnaWalk</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="College Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        keyboardType="default"
        secureTextEntry={true}
      />

      {isSignUpPage ? (
        <Button title="Sign Up" onPress={signUp} />
      ) : (
        <Button title="Log in" onPress={login} />
      )}

      {isSignUpPage ? (
        <Button
          title="Already have an account?"
          onPress={() => setIsSignUpPage(!isSignUpPage)}
        />
      ) : (
        <Button
          title="Don't have an account?"
          onPress={() => setIsSignUpPage(!isSignUpPage)}
        />
      )}
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
