import React from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { router } from "expo-router";

const uri = "../assets/images/loginfondo.jpeg";
const profilepicture = "https://randomuser.me/api/portraits/men/1.jpg";

export default function Login({ navigation }: any) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario creado");
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario logueado");
        const user = userCredential.user;
        console.log(user);
        router.push({
          pathname: "/(tabs)",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Usuario logueado");
  };

  return (
    <View style={[styles.container]}>
      <Image
        source={{ uri: uri }}
        style={[styles.image, StyleSheet.absoluteFill]}
      />
      <View style={styles.overlay} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlurView intensity={90} style={{ borderRadius: 20 }}>
          <View style={styles.login}>
            <Image
              source={{ uri: profilepicture }}
              style={styles.profilePicture}
            />
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Email
              </Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="Correo"
              />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Contraseña
              </Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              onPress={handleLogin}
              style={[
                styles.button,
                { backgroundColor: "#BE1622", marginTop: 20 },
              ]}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
        <TouchableOpacity
          onPress={handleCreateAccount}
          style={[styles.button, { backgroundColor: "#5C6AE9" }]}
        >
          <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
            {" "}
            Crear cuenta
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Fondo negro para mayor contraste
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Color negro semitransparente
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    marginVertical: 18,
  },
  login: {
    width: 350,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semitransparente
  },
  input: {
    width: 250,
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Fondo semitransparente
    color: "#fff", // Texto blanco
  },
  button: {
    width: 220,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "400",
    color: "white",
  },
  labelText: {
    fontSize: 17,
    fontWeight: "400",
    color: "white",
  },
});
