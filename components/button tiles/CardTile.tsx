import React, { useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Pressable, Text } from "react-native";
import { Card } from "react-native-paper";
interface IProps {
  id:string,
  navigation:any
}

const CardTile = (props:IProps) => {
  const {id, navigation} = props;
  return <Card.Actions
    style={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Pressable
      onPress={()=>navigation.navigate("stackpage", {lauchpadId:id})}
      style={{
        backgroundColor: "#060617",
        width: "100%",
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      android_ripple={{ color: "#fff" }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "#fff",
        }}
      >
        {id}
      </Text>
      <FontAwesome5 name={"arrow-right"} color={"#fff"} size={20} />
    </Pressable>
  </Card.Actions>;
};

export default CardTile;
