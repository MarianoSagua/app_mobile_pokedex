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
import { auth, signInWithEmailAndPassword } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm() {
  const navigation = useNavigation();
  const [error, setError] = useState(false);

  const initialValues = ()=>{
    return{
      email: "",
      password: "",
    };
  }

  const validationSchema = () => {
    return {
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    };
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async (formData) => {
      const { email, password } = formData;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        setError(false);
        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");
        navigation.navigate("UserDetails");
      } catch (error) {
        console.log(error);
        setError(true);
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Log In</Text>

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

      <Text style={error ? styles.errorLoginShow : styles.errorLoginHidden}>
        Email or password are invalid
      </Text>

      <TouchableOpacity onPress={formik.handleSubmit} style={styles.buttonForm}>
        <Text style={{ color: "white", textAlign: "center" }}>Enter</Text>
      </TouchableOpacity>

      <View style={styles.createAccount}>
        <Text style={styles.createAccount__textOne}>Dont have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.createAccount__textTwo}>Create One!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  buttonForm: {
    width: 100,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  errorLoginShow: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  errorLoginHidden: {
    display: "none",
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  createAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  createAccount__textOne: {
    marginRight: 5,
  },
  createAccount__textTwo: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
