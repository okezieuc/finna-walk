import { View, Text, Button } from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from "expo-router";

import app from "../services/auth";
import { useEffect, useState } from "react";
const auth = getAuth(app);
const db = getFirestore(app);

function ScheduleWalk() {
  const available_times = [4, 15, 16, 17, 18, 19];
  const [walksBookedForTodayStartHours, setWalksBookedForTodayStartHours] =
    useState([]);

  async function bookWalk(startHour) {
    try {
      const createdWalkRef = await addDoc(
        collection(db, "session_reservations"),
        {
          for: auth.currentUser.uid,
          time: getDateTimeForStartingAfternoonHour(startHour),
          day: new Date().toDateString(),
          startHour: startHour,
        }
      );

      // after successfully creating an event, add the start hour to
      // walksBookedForTodayStartHours
      setWalksBookedForTodayStartHours([
        ...walksBookedForTodayStartHours,
        startHour,
      ]);

      // TODO: if this works, display a snackbar that tells the user that their
      // reservation was successful.
    } catch (e) {
      // TODO: Display a snackbar that informs the user that an error ocurred
    }
  }

  // fetch all of a user's booked events for the day when they open the app
  useEffect(() => {
    async function loadWalksForToday() {
      // query firestore for all walks booked for today
      const walkReservationsRef = collection(db, "session_reservations");
      const walksBookedTodayQuery = query(
        walkReservationsRef,
        where("day", "==", new Date().toDateString())
      );

      const querySnapshot = await getDocs(walksBookedTodayQuery);

      const newWalksBookedForToday = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newWalksBookedForToday.push(doc.data().startHour);
      });

      // update walksBookedForToday with walks booked for the day
      setWalksBookedForTodayStartHours(newWalksBookedForToday);
    }

    loadWalksForToday();
  }, []);

  return (
    <View>
      <Text>Schedule a Walk</Text>

      <Text>Booked Times</Text>
      {walksBookedForTodayStartHours.map((reservationStartHour) =>
        reservationStartHour == new Date().getHours() ? (
          // we will build the logic for showing the current active walk on this
          <View key={reservationStartHour}>
            <Text>Active: {reservationStartHour}</Text>
            <Link href={`/src/screens/group_listing/${reservationStartHour}`}>
              People
            </Link>
          </View>
        ) : (
          <View key={reservationStartHour}>
            <Text>{reservationStartHour}</Text>
            <Link href={`/src/screens/group_listing/${reservationStartHour}`}>
              People
            </Link>
          </View>
        )
      )}

      <Text>Available Times</Text>

      {available_times.map((time) =>
        !walksBookedForTodayStartHours.includes(time) ? (
          <View key={time}>
            <View>
              <Text style={{ textAlign: "center" }}>{time} pm </Text>
            </View>
            <Button title="Book" onPress={() => bookWalk(time)} />
          </View>
        ) : null
      )}
    </View>
  );
}

function getDateTimeForStartingAfternoonHour(hour) {
  var currentDate = new Date();
  currentDate.setHours(hour, 0, 0, 0); // Set hours to 14 (2 PM), minutes and seconds to 0, and milliseconds to 0
  return currentDate;
}

export default ScheduleWalk;
