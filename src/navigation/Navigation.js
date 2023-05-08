import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';
import Favs from '../screens/Favs';
import PokedexNav from './PokedexNav';
import AccountNav from './AccountNav';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName='PokedexNav'>
        <Tab.Screen 
          name='AccountNav'
          component={AccountNav}
          options={{
            tabBarLabel: "My Account",
            tabBarIcon: ({color, size}) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            headerShown: false
          }}
        />

        <Tab.Screen 
          name='PokedexNav'
          component={PokedexNav}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => getPokeball(),
            headerShown: false
          }}
        />

        <Tab.Screen 
          name='Favs'
          component={Favs}
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({color, size}) => (
              <AntDesign name="heart" size={size} color={color} />
            ),
            headerShown: false
          }}
        />
    </Tab.Navigator>
  )
}

const getPokeball = ()=>{
  return(
    <Image 
    source={require("../assets/Pokeball.png")} 
    style={{width: 75, height: 75, top: -15}} 
    />
  )
}





