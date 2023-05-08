import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const UseUserLoged = () => {
    const [user] = useAuthState(auth);
    const [userLoged, setUserLoged] = useState({});

    useEffect(()=>{
        const usersCollection = collection(db, "usersPokedexAppMobile");

        if(user !== null){
            getDocs(usersCollection)
                .then((response)=>{
                    const usersDocs = response.docs.map((doc) => ({...doc.data(), id: doc.id}));
                    const userLogedData = usersDocs.find((data) => data.uid === user.uid);
                    setUserLoged(userLogedData);
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }, [user])

    return userLoged;
}