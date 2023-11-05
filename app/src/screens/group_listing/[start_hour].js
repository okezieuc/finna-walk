import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import app from "../..//services/auth";
const db = getFirestore(app);

export default function Page() {
  const { start_hour } = useLocalSearchParams();
  const [walkingGroupMembers, setWalkingGroupMembers] = useState([]);

  // load all the reservations of people who are scheduled
  // for start_hour

  useEffect(() => {
    async function loadReservationsForTheHour() {
      const walkReservationsRef = collection(db, "session_reservations");
      const reservationsForTheHourQuery = query(
        walkReservationsRef,
        where("day", "==", new Date().toDateString()),
        where("startHour", "==", parseInt(start_hour))
      );

      const querySnapshot = await getDocs(reservationsForTheHourQuery);

      const membersAccumulator = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        membersAccumulator.push(doc.data());
      });

      setWalkingGroupMembers(membersAccumulator);
    }

    loadReservationsForTheHour();
  }, [start_hour]);

  return (
    <View>
      <Text>Walk Start Time: {start_hour}</Text>
      {walkingGroupMembers.map((person) => (
        <Text>{person.for}</Text>
      ))}
    </View>
  );
}
