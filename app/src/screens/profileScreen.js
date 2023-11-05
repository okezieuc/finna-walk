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
import { getAuth } from "firebase/auth";

import { router } from "expo-router";

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
        <SafeAreaView>
            <View>
                <Text>{data ? JSON.stringify(data): null}</Text>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen;
