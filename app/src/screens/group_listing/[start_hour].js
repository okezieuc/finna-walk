import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    <View style={{ paddingHorizontal: 20 }}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginTop: 40,
          marginBottom: 50,
        }}
      >
        Finna'Walk
      </Text>
      <Text style={{ fontSize: 24 }}>My Crew</Text>
      <Text style={{ marginBottom: 10 }}>
        {start_hour}:00 - {parseInt(start_hour) + 1}:00
      </Text>
      <View style={styles.message}>
        <Text style={{ color: "ghostwhite" }}>
          Meet your crew in front of the Fisk Memorial Chapel. And have fun!
        </Text>
      </View>
      {walkingGroupMembers.map((person) => (
        <View key={person} style={styles.walkPartner}>
          <Text>{walkingGroupProfiles[person].name}</Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  walkPartner: {
    backgroundColor: "ghostwhite",
    textAlign: "left",
    borderRadius: 5,
    marginVertical: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: "darkblue",
    borderWidth: 2,
    paddingHorizontal: 10,
  },
  message: {
    backgroundColor: "darkblue",
    textAlign: "left",
    borderRadius: 5,
    marginVertical: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: " ghostwhite",
    borderWidth: 2,
    paddingHorizontal: 10,
  },
});
