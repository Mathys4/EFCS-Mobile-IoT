import { FlatList, View } from "react-native";
import PlayerCard from "./components/playerCard";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={["a","b","c"]}
        renderItem={({item : player}) => 
            <View>
              <PlayerCard name={player}></PlayerCard>
            </View>
        }/>
    </View>
  );
}
