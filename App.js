import { StatusBar } from 'expo-status-bar';

import React, { useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import app from './src/services/auth.js'
import { getAuth, onAuthStateChanged, signOut} from 'firebase/auth';

import AuthScreen from './app/src/screens/AuthScreen.js';

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
  }, [])

  if (initializing) return null;

  if ( !user ) return <AuthScreen />;

  return (
    <SafeAreaView>
      <ScrollView>
        <Button onPress={() => {signOut(auth)}} title='Sign Out'/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
