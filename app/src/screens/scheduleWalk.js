import { View, Text, Button } from "react-native";

function ScheduleWalk() {
  available_times = ["1pm", "2pm", "3pm"];

  return (
    <View>
      <Text>Schedule a Walk</Text>

      {available_times.map((time) => (
        <View>
          <View>
            <Text style={{ textAlign: "center" }}>{time}</Text>
          </View>
          <Button title="Book" />
        </View>
      ))}
    </View>
  );
}

export default ScheduleWalk;
