import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../FirebaseConfig";
import ItemFavPokemon from "../components/ItemFavPokemon";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useData } from "../context/DataContext";

export default function Favs() {
  const navigation = useNavigation(auth);
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoged, setUserLoged] = useState({});
  const [favLogged, setFavLogged] = useState([]);
  const { deleteAllFavorites } = useData();

  useEffect(() => {
    const usersCollection = collection(db, "usersPokedexAppMobile");

    if (user !== null) {
      getDocs(usersCollection)
        .then((response) => {
          const docsUsers = response.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const userData = docsUsers.find((data) => data.uid === user.uid);
          setUserLoged(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (userLoged) {
      const favsUser = userLoged.favoritos;
      setFavLogged(favsUser);
    }
  }, [user, userLoged]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {currentUser ? (
        <>
          <View style={styles.containerTitle}>
            <Text style={styles.titleFavs}>Favorites:</Text>
            <TouchableOpacity>
              <Text style={styles.deleteAll} onPress={() => deleteAllFavorites()}>Eliminar Todos</Text>
            </TouchableOpacity>
          </View>

          {favLogged &&
            favLogged.map((item, idx) => {
              return <ItemFavPokemon key={idx} item={item} />;
            })}
        </>
      ) : (
        <>
          <Text style={styles.title}>
            You have to login with your account first to be able to add
            favorites.
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnText}>Go to Log in!</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  containerTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  titleFavs: {
    marginLeft: 10,
    fontSize: 40,
    fontWeight: 800,
  },
  deleteAll: {
    color: "blue",
    fontWeight: "bold",
    marginRight: 15,
  },
  btn: {
    width: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    color: "blue",
  },
});
