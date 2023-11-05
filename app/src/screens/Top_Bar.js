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

import { signOut } from "@firebase/auth";

import { router } from 'expo-router'; 

const Top_Bar = ({ currentPage }) => {
    return (
        <View style={styles.bar}>
            <TouchableOpacity onPress={() => {router.back()}}>
                <MaterialCommunityIcons name='chevron-left' size={40}/>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    signOut(auth);
                    router.replace('/');
                }}
            >
                <Text style={{color: 'blue', fontSize: 17}}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 20
    }
})

export default Top_Bar