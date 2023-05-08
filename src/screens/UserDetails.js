import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { UseUserLoged } from "../hooks/UseUserLoged";
import { auth } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function UserDetails() {
  const navigation = useNavigation();
  const userLoged = UseUserLoged();

  const handleSignOut = () => {
    auth.signOut()
      .then(()=>{
        navigation.navigate("Login");
      })
      .catch((error)=>{
        console.log(error);
      })
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Account Details</Text>

        <Text style={styles.data}>Name: {userLoged.name}</Text>
        <Text style={styles.data}>Last Name: {userLoged.lastName}</Text>
        <Text style={styles.data}>Age: {userLoged.age}</Text>
        <Text style={styles.data}>Address: {userLoged.address}</Text>
        <Text style={styles.data}>Email: {userLoged.email}</Text>
      </View>

      <TouchableOpacity style={styles.btnLogOut} onPress={handleSignOut}>
        <Text style={styles.btnLogOutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  data: {
    fontSize: 18,
    marginBottom: 10
  },
  btnLogOut: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center'
  },
  btnLogOutText:{
    color: "white"
  }
});