import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Image
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import {
  getFirestore, setDoc, doc, addDoc, collection
} from "firebase/firestore"


import app from "../services/auth";
import walker_img from '../assets/imgs/walker.jpg'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from "react-native-gesture-handler";

import {router} from 'expo-router';

const auth = getAuth(app);
const db = getFirestore(app);

const AuthScreen = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  // if isIntroPage is true, then it is on the intro screen
  const [isIntroPage, setIsIntroPage] = useState(true);

  // if isSignUpPage is true, then we are sigining a user up
  const [isSignUpPage, setIsSignUpPage] = useState(true);

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // TODO: Show a snackbar to the user if sign up is successfull
        // TODO: Redirect a user to an onboarding page after they create
        // their account.
        return setDoc(
          doc(db, "profiles", userCredential.user.uid),
          {
            user_id: userCredential.user.uid,
            name: displayName,
            rating: 5
          }
        )
      }).then((ref) => {
        console.log(ref)
      })
      .catch((error) => {
        // TODO: Show an error message to the user if an error occurs
        console.error(error)
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

  if (isIntroPage) {
    return (
      <SafeAreaView>
        <View>
          <Image source={walker_img} style={{width: 400, height:400}}/>
        </View>
        <Text>You don't need to walk alone.</Text>
        <Button onPress={() => {setIsIntroPage(false); setIsSignUpPage(false);}}title="Login" />
        <Button onPress={() => {setIsIntroPage(false); setIsSignUpPage(true);}}title="Sign Up" />
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => setIsIntroPage(true)}>
          <MaterialCommunityIcons name="arrow-left" size={40}/>
        </TouchableOpacity>
      </View>
      <Text>FinnaWalk</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="College Email"
        keyboardType="email-address"
      />
      {isSignUpPage ? (
        <TextInput
          style={styles.input}
          onChangeText={setDisplayName}
          value={displayName}
          placeholder="Display Name"
          keyboardType="email-address"
        />
      ) : null}
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        keyboardType="default"
        secureTextEntry={true}
      />
      {isSignUpPage ? (
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm password"
          keyboardType="default"
          secureTextEntry={true} />
      ) : null}

      {isSignUpPage ? (
        <Button title="Sign Up" onPress={signUp} disabled={!email.length || !displayName.length || !password.length || password != confirmPassword}/>
      ) : (
        <Button title="Log in" onPress={login} disabled={!email.length || !password}/>
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
