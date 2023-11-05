import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text
} from "react-native";

import { Link, Redirect} from "expo-router";
import Bottom_Bar from "./src/screens/Bottom_Bar.js";
import Top_Bar from "./src/screens/Top_Bar.js";

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

  return <Redirect href="/src/screens/scheduleWalk" />;

  return (
    <SafeAreaView>
      <Top_Bar />
      <ScrollView>
        <View style={{ height: 100 }} />
      </ScrollView>
      <Bottom_Bar currentPage={0}/>
    </SafeAreaView>
  );
};

export default App;
