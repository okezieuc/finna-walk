import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Stack } from "expo-router";

const Bottom_Bar = ({ currentPage }) => {
    return (
        <View style={styles.bar}>
            <Link href="/src/screens/scheduleWalk"  style={currentPage == 0 ? styles.current : styles.notCurrent}>
                <MaterialCommunityIcons name='shoe-print' size={40}  style={currentPage == 0 ? styles.current : styles.notCurrent}/>
            </Link>
            <Link href="/src/screens/profileScreen"  style={currentPage == 1 ? styles.current : styles.notCurrent}>
                <MaterialCommunityIcons name='account' size={40}  style={currentPage == 1 ? styles.current : styles.notCurrent}/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderTopWidth: 4,
        borderColor: 'blue',
    },
    current: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    notCurrent: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10
    }
})

export default Bottom_Bar