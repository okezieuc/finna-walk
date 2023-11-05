import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Image,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";

import app from "../services/auth";
import walker_img from "../assets/imgs/walker.png";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { router } from "expo-router";

const auth = getAuth(app);
const db = getFirestore(app);

const AuthScreen = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        return setDoc(doc(db, "profiles", userCredential.user.uid), {
          user_id: userCredential.user.uid,
          name: displayName,
          rating: 5,
        });
      })
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        // TODO: Show an error message to the user if an error occurs
        console.error(error);
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
        <View style={styles.pageContainer}>
          <Text style={styles.heroHeader}>Finna'Walk</Text>
          <View>
            <Image source={walker_img} style={styles.coverImage} />
          </View>
          <Text style={styles.heading}>You don't need to walk alone.</Text>
          <Text style={styles.subtitle}>
            Make friends. Achieve Milestones. Stay fit.
          </Text>
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity
              style={styles.authPageSelectorButtonContainer}
              onPress={() => {
                setIsIntroPage(false);
                setIsSignUpPage(false);
              }}
            >
              <Text style={styles.authPageSelectorButtonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.authPageSelectorButtonContainer}
              onPress={() => {
                setIsIntroPage(false);
                setIsSignUpPage(true);
              }}
            >
              <Text style={styles.authPageSelectorButtonText}>
                Sign up with email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => setIsIntroPage(true)}>
          <MaterialCommunityIcons name="chevron-left" size={24}/>
        </TouchableOpacity>
      </View>
      <Text>{isSignUpPage ? 'Create Account With School Email' : 'Log In'}</Text>
      <View>
        <Text>Your email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="example@my.school.edu"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {isSignUpPage ? (
          <>
            <Text>Display Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDisplayName}
              value={displayName}
              placeholder="Display Name"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </>
        ) : null}

        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
        />

        {isSignUpPage ? (
          <>
            <Text>Confirm Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirm password"
              keyboardType="default"
              secureTextEntry={true} />
          </>
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
      </View>
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
  coverImage: {
    width: 300,
    height: 300,
    marginHorizontal: "auto",
    marginTop: 50,
  },
  heroHeader: {
    marginTop: 20,
    fontSize: 40,
    textAlign: "center",
    fontWeight: "800",
  },
  pageContainer: {
    paddingHorizontal: 30,
  },
  heading: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  authPageSelectorButton: {
    color: "#fff",
  },
  authPageSelectorButtonContainer: {
    backgroundColor: "blue", // Set the background color to blue
    paddingVertical: 12, // Vertical padding around the text
    paddingHorizontal: 24, // Horizontal padding around the text
    borderRadius: 8, // Border radius for rounded corners
    marginVertical: 4,
  },
  authPageSelectorButtonText: {
    color: "white", // Set the text color to white
    fontSize: 16, // Font size of the text
    textAlign: "center", // Center the text horizontally within the button
  },
});
