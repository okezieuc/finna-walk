import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {
  collection,
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
  const [walkingGroupProfiles, setWalkingGroupProfiles] = useState({});

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
        membersAccumulator.push(doc.data().for);
      });

      const profilesRef = collection(db, "profiles");
      const partnerProfilesQuery = query(
        profilesRef,
        where("user_id", "in", membersAccumulator)
      );

      const profilesQuerySnapshot = await getDocs(partnerProfilesQuery);

      const profiles = {};

      profilesQuerySnapshot.forEach((doc) => {
        current_entry = doc.data();
        profiles[current_entry.user_id] = current_entry;
      });

      setWalkingGroupProfiles(profiles);
      setWalkingGroupMembers(membersAccumulator);
    }

    loadReservationsForTheHour();
  }, [start_hour]);

  return (
    <View>
      <Text>Walk Start Time: {start_hour}</Text>
      {walkingGroupMembers.map((person) => (
        <Text key={person}>{walkingGroupProfiles[person].name}</Text>
      ))}
    </View>
  );
}
