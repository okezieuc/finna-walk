import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

import app from "../services/auth.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { router } from 'expo-router'; 

const Top_Bar = ({ currentPage }) => {
    const auth = getAuth(app);

    return (
        <View style={styles.bar}>
            {router.canGoBack() ? 
            <TouchableOpacity onPress={() => {router.back()}}>
                <MaterialCommunityIcons name='chevron-left' size={40}/>
            </TouchableOpacity> : null}

            <Text style={{color: 'blue', fontSize: 17}} 
            onPress={() => {
                signOut(auth);
                router.replace('/');
            }}>
                Sign Out
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: router.canGoBack() ? 'space-between' : 'flex-end',
        padding: 10,
        paddingHorizontal: 20


    }
})

export default Top_Bar