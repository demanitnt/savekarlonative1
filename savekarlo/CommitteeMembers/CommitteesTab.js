import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import ViewAllCommittees from "./ViewAllCommittees";
import AddOneCommittee from "./AddOneCommittee";
import MemberMain from "./CommitteeDetailbyMember/MemberMain";

const Stack = createStackNavigator();

const CommitteesTab = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#29434e",
          },
        }}
      >
        <Stack.Screen
          name="viewAllcommittees"
          component={ViewAllCommittees}
          options={{
            title: "Committees",
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="addOnecommittee"
          component={AddOneCommittee}
          options={{
            title: "Add Committee",
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="membermain"
          component={MemberMain}
          options={{
            title: "MemberMain",
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </>
  );
};
export default CommitteesTab;
