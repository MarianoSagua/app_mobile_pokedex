import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import LoginForm from "../screens/LoginForm";
import UserDetails from "../screens/UserDetails";

const Stack = createNativeStackNavigator();

export default function AccountNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginForm}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{ title: "", headerTransparent: true, headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
