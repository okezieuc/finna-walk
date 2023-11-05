import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  const { start_hour } = useLocalSearchParams();

  return (
    <View>
      <Text>Walk Start Time: {start_hour}</Text>
    </View>
  );
}
