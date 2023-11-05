import { View, Text, Button, SafeAreaView} from "react-native";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Stack } from 'expo-router';

import { getAuth } from "firebase/auth";

import { router } from "expo-router";

import Bottom_Bar from "./Bottom_Bar";

import app from "../services/auth";
import { useEffect, useState } from "react";
const auth = getAuth(app);
const db = getFirestore(app);

const ProfileScreen = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        if (auth.currentUser) {
            getDoc(doc(db, 'profiles', auth.currentUser.uid)).then((docSnap) => {
                setData(docSnap.data())
            })
        } else {
            router.replace('/')
        }
    }, [])

    return (
        <>
            <Stack.Screen />
            <SafeAreaView>
                <View>
                    <Text>{data ? JSON.stringify(data): null}</Text>
                    <Bottom_Bar currentPage={1}/>
                </View>
            </SafeAreaView>
        </>
    )
}

export default ProfileScreen;
