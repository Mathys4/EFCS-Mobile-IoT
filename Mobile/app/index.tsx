import { FlatList, View } from "react-native";
import PlayerCard from "./components/playerCard";
import { useUserContext } from "@/hooks/useUser";
import { useEffect } from "react";

export default function Index() {
  const {getAllUsers} = useUserContext()

  useEffect(()=>{
    getAllUsers()
  }, [])

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
