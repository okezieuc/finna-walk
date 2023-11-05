import { View, Text, Button } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import app from "../services/auth";
const auth = getAuth(app);
const db = getFirestore(app);

function ScheduleWalk() {
  available_times = [3, 4, 5, 6, 7];

  async function bookWalk(startHour) {
    try {
      const createdWalkRef = await addDoc(
        collection(db, "session_reservations"),
        {
          for: auth.currentUser.uid,
          time: getDateTimeForStartingAfternoonHour(startHour),
        }
      );

      // TODO: if this works, display a snackbar that tells the user that their
      // reservation was successful.
    } catch (e) {
      // TODO: Display a snackbar that informs the user that an error ocurred
    }
  }

  return (
    <View>
      <Text>Schedule a Walk</Text>

      {available_times.map((time) => (
        <View>
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
