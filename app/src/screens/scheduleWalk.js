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

import app from "../services/auth";
import { useEffect, useState } from "react";
const auth = getAuth(app);
const db = getFirestore(app);

function ScheduleWalk() {
  const available_times = [3, 4, 5, 6, 7];
  const [walksBookedForToday, setWalksBookedForToday] = useState([]);

  async function bookWalk(startHour) {
    try {
      const createdWalkRef = await addDoc(
        collection(db, "session_reservations"),
        {
          for: auth.currentUser.uid,
          time: getDateTimeForStartingAfternoonHour(startHour),
          day: new Date().toDateString(),
        }
      );

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
        console.log(doc.id, " => ", doc.data());
        newWalksBookedForToday.push(doc.data());
      });

      // update walksBookedForToday with walks booked for the day
      setWalksBookedForToday(newWalksBookedForToday);
    }

    loadWalksForToday();
  }, []);

  return (
    <View>
      <Text>Schedule a Walk</Text>

      {walksBookedForToday.map((reservation_data) => (
        <Text>{reservation_data.day}</Text>
      ))}

      {available_times.map((time) => (
        <View key={time}>
          <View>
            <Text style={{ textAlign: "center" }}>{time} pm</Text>
          </View>
          <Button title="Book" onPress={() => bookWalk(time)} />
        </View>
      ))}
    </View>
  );
}

function getDateTimeForStartingAfternoonHour(hour) {
  var currentDate = new Date();
  currentDate.setHours(12 + hour, 0, 0, 0); // Set hours to 14 (2 PM), minutes and seconds to 0, and milliseconds to 0
  return currentDate;
}

export default ScheduleWalk;
