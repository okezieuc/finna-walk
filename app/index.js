import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  View,
} from "react-native";

import { Link } from "expo-router";

import app from "./src/services/auth.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import AuthScreen from "./src/screens/AuthScreen.js";

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const auth = getAuth(app);

  function FireBaseOnAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, FireBaseOnAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) return <AuthScreen />;

  return (
    <SafeAreaView>
      <ScrollView>
        <Link href="/src/screens/scheduleWalk">Schedule Walk</Link>
        <Link href="/src/screens/profileScreen">Profile</Link>
        <View style={{ height: 100 }} />
        <Button
          onPress={() => {
            signOut(auth);
          }}
          title="Sign Out"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
