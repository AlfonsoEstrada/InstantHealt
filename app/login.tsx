import React from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
  Alert,
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

const uri = require("../assets/images/loginfondo.jpeg");
const profilepicture = "https://randomuser.me/api/portraits/men/1.jpg";

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
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
        Alert.alert("Usuario ", "Usuario creado exitosamente");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("Inicio exitoso", "Bienvenido a InstantHealth");
        const user = userCredential.user;
        console.log(user);;
        navigation.navigate("Main");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "El correo electrónico no es válido.");
        } else if (error.code === "auth/user-not-found") {
          Alert.alert(
            "Error",
            "No se encontró un usuario con ese correo electrónico."
          );
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Error", "La contraseña es incorrecta.");
        } else {
          Alert.alert("Error", "Ocurrió un error al iniciar sesión.");
        }
      });
  };

  return (
    <View style={[styles.container]}>
      <Image source={uri} style={[styles.image, StyleSheet.absoluteFill]} />
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
        <Text style={{ color: "white", fontSize: 30, marginBottom: 15 }}>
          Bienvenido
        </Text>
        <BlurView intensity={90} style={{ borderRadius: 20 }}>
          <View style={styles.login}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Usuario
              </Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="Correo"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  color: "white",
                  textAlign: "center",
                }}
              >
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
                { backgroundColor: "#5cb85c", marginTop: 20 },
              ]}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button, { backgroundColor: "#5C6AE9" }]}
        >
          <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
            No tengo cuenta.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)", 
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 7,
    borderColor: "#fff",
    marginVertical: 18,
  },
  login: {
    width: 300,
    padding: 20,
    borderRadius: 5,
    
    alignItems: "center",
    backgroundColor: "#BE1622", 

  },
  input: {
    width: 250,
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)", 
    color: "#fff",
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
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
});


export default Login;