import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import ViewAllMembers from "./ViewAllMembers";
import AddMember from "./AddMember";

const Stack = createStackNavigator();

const MemberMain = () => {
  //  console.log('The ruoute in membermain ', route)
  // const dataFromCommitteesTab=route
  return (
    <>
      {/* <View onPress={navigation.navigate("viewallmembers", {route: dataFromCommitteesTab})}></View> */}
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#29434e",
          },
        }}
      >
        <Stack.Screen
          name="viewallmembers"
          component={ViewAllMembers}
          options={{
            title: "Committees Detail",
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="addmember"
          component={AddMember}
          options={{
            title: "Add Member",
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </>
  );
};
export default MemberMain;
