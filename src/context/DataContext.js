import React, { createContext, useContext, useState } from "react";
import { db } from "../FirebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; 
import { UseUserLoged } from "../hooks/UseUserLoged";

const context = createContext();
const Provider = context.Provider;

export const useData = () => {
  const contextValue = useContext(context);

  return contextValue;
};

export default function DataContext({ children }) {
  const userLoged = UseUserLoged();

  const agregarUser = (name, lastName, age, address, email, uid) => {
    const usersCollection = collection(db, "usersPokedexAppMobile");

    try {
      addDoc(usersCollection, {
        name: name,
        lastName: lastName,
        age: age,
        address: address,
        email: email,
        uid: uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFav = (item)=>{
    const userDocRef = doc(db, "usersPokedexAppMobile", userLoged.id);

    updateDoc(userDocRef, {
      favoritos: firebase.firestore.FieldValue.arrayRemove(item)
    });
  }

  const deleteAllFavorites = ()=>{
    const userDocRef = doc(db, "usersPokedexAppMobile", userLoged.id);

    updateDoc(userDocRef, {
      favoritos: []
    });
  }

  const contextValue = {
    agregarUser: agregarUser,
    deleteAllFavorites: deleteAllFavorites,
    deleteFav: deleteFav
  };

  return <Provider value={contextValue}>{children}</Provider>;
}


