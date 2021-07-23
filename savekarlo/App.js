import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, LogBox, SafeAreaView } from "react-native";
import { db } from "./firebase";
import { auth } from "./firebase";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginRegister/LoginScreen";
import RegisterScreen from "./LoginRegister/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import LogOutTab from "./LoginRegister/LogOutTab";
import CommitteesTab from "./CommitteeMembers/CommitteesTab";
import { decode, encode } from "react-native-base64";
import { DarkTheme } from "react-native-paper";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  const [members, setMembers] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  const MyTheme = {
    dark: false,
    colors: {
      primary: "blue",
      background: "orange",
      card: "yellowblue",
      text: "rgb(28, 28, 30)",
      border: "black",
      notification: "red",
    },
  };

  const handlePress = () => {
    console.log("Clicked");
  };

  useEffect(() => {
    const ref = db.collection("savekarlo");
    ref.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setMembers(objs);
    });
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      {signedIn ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#29434e" }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === "committees") {
                  return (
                    <FontAwesome name="list-ul" size={size} color={color} />
                  );
                }
                if (route.name === "setting") {
                  return <FontAwesome name="cogs" size={size} color={color} />;
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: "blue",
              inactiveTintColor: "white",
              style: {
                backgroundColor: "tomato",
              },
            }}
          >
            <Tab.Screen
              name="committees"
              component={CommitteesTab}
              options={{
                title: "Committees",
              }}
            />
            <Tab.Screen
              name="logout"
              component={LogOutTab}
              options={{
                title: "logout",
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <>
          <StatusBar style="light" />
          <Stack.Navigator mode="card" screenOptions={{}}>
            <Stack.Screen
              name="signIn"
              component={LoginScreen}
              options={{
                title: "Sign In",

                headerStyle: {
                  backgroundColor: "#29434e",
                  borderBottomColor: "#29434e",
                },
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{
                title: "Register",
                headerStyle: {
                  backgroundColor: "#29434e",
                  borderBottomColor: "#29434e",
                },
                headerTintColor: "#fff",
              }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
