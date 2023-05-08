import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useData } from "../context/DataContext";
import { auth } from "../FirebaseConfig";

export default function Register() {
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const { agregarUser } = useData();

  const initialValues = () => {
    return {
      name: "",
      lastName: "",
      age: 0,
      address: "",
      email: "",
      password: "",
    };
  };

  const validationSchema = () => {
    return {
      name: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      age: Yup.string().required("Age is required"),
      address: Yup.string().required("address is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("password is required"),
    };
  };

  const formik = useFormik({
    initialValues: validationSchema(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async (formData) => {
      const { email, password, name, lastName, age, address } = formData;

      try {
        setError(false);

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            agregarUser(
              name,
              lastName,
              age,
              address,
              email,
              userCredential.user.uid
            );
            navigation.navigate("UserDetails");
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
        setError(true);
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={formik.values.name}
        onChangeText={(text) => formik.setFieldValue("name", text)}
      />

      <TextInput
        placeholder="LastName"
        style={styles.input}
        value={formik.values.lastName}
        onChangeText={(text) => formik.setFieldValue("lastName", text)}
      />

      <TextInput
        placeholder="Age"
        style={styles.input}
        value={formik.values.age}
        onChangeText={(number) => formik.setFieldValue("age", number)}
      />

      <TextInput
        placeholder="Address"
        style={styles.input}
        value={formik.values.address}
        onChangeText={(text) => formik.setFieldValue("address", text)}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />

      <Text
        style={error ? styles.errorRegisterShow : styles.errorRegisterHidden}
      >
        You have to fill in all the data
      </Text>

      <TouchableOpacity onPress={formik.handleSubmit} style={styles.buttonForm}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Create Account!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 120,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.3,
    borderColor: "grey",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  buttonForm: {
    width: 150,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  errorRegisterShow: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  errorRegisterHidden: {
    display: "none",
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});
