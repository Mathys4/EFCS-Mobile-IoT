import { Text, View } from "react-native";

type PlayerCardProps = {
    name: string
}

export default function PlayerCard({name} : PlayerCardProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Text>{name}</Text>
    </View>
  );
}