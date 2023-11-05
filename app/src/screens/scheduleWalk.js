import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
      <ScrollView>
        <View style={styles.container}>
          <Text>Schedule a Walk</Text>
          <Text>Booked Times</Text>
          {walksBookedForTodayStartHours.map((reservationStartHour) =>
            reservationStartHour == new Date().getHours() ? (
              // we will build the logic for showing the current active walk on this
              <View key={reservationStartHour}>
                <Text>Active: {reservationStartHour}</Text>
                <Link
                  href={`/src/screens/group_listing/${reservationStartHour}`}
                >
                  People
                </Link>
              </View>
            ) : (
              <View key={reservationStartHour}>
                <Text>{reservationStartHour}</Text>
                <Link
                  href={`/src/screens/group_listing/${reservationStartHour}`}
                >
                  People
                </Link>
              </View>
            )
          )}
          <Text>Available Times</Text>
          {available_times.map((time) =>
            !walksBookedForTodayStartHours.includes(time) ? (
              <AvailableWalkSlot time={time} bookWalkFunc={bookWalk} />
            ) : null
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function getDateTimeForStartingAfternoonHour(hour) {
  var currentDate = new Date();
  currentDate.setHours(hour, 0, 0, 0); // Set hours to 14 (2 PM), minutes and seconds to 0, and milliseconds to 0
  return currentDate;
}

export default ScheduleWalk;

function AvailableWalkSlot({ time, bookWalkFunc }) {
  return (
    <View key={time} style={styles.walkSlot}>
      <View>
        <Text style={{ textAlign: "center" }}>{time} pm </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => bookWalkFunc(time)}
      >
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  walkSlot: {
    backgroundColor: "ghostwhite",
    textAlign: "left",
    borderRadius: 5,
    marginVertical: 10,
    paddingTop: 30,
    paddingBottom: 10,
    borderColor: "darkblue",
    borderWidth: 2,
  },
  container: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: "blue", // Set the background color to blue
    paddingVertical: 12, // Vertical padding around the text
    paddingHorizontal: 24, // Horizontal padding around the text
    borderRadius: 5, // Border radius for rounded corners
    marginVertical: 4,
    marginHorizontal: 10
  },
  buttonText: {
    color: "white", // Set the text color to white
    fontSize: 16, // Font size of the text
    textAlign: "center", // Center the text horizontally within the button
  },
});
