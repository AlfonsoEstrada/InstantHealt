import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";

const firstaid = "../assets/images/firstaid.jpg";
const heridas = "../assets/images/heridas.jpg";
const rcp = "../assets/images/rcp.jpg";
const quemaduras = "../assets/images/quemaduras.jpg";






const HomeComponent: React.FC<{ navigation: any }> = ({ navigation }) => {

  function CourseCard(CourseName: string) {
    navigation.navigate("CourseList", { title: CourseName });
  }

  return (
    <ScrollView style={{ backgroundColor: "#e4e4eb" }}>
      <View
        style={{
          flex: 1,
          padding: 20,
          paddingBottom: 25,
          paddingTop: 45,
          marginHorizontal: 0,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
                <Text style={styles.title1} >Bienvenido,  ¿Que vamos a aprender hoy?</Text>

        <TouchableOpacity 
        onPress={() => navigation.toggleDrawer()}
        style={{
          marginLeft:10,
          height: 45,
          width: 45,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#BE1622",
        }}
        >
          <Icon name="bars" size={30} color="white" />
        </TouchableOpacity>


      </View>
      <View
        style={{
          backgroundColor: "#ffff",
          padding: 30,
          borderTopStartRadius: 13,
          borderTopEndRadius: 13,
          alignSelf: "center",
        }}
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            <Text style={{fontWeight: 700}} >Aprende lecciones de RCP en minutos</Text>
          </Text>
          <Image source={require(rcp)} style={styles.img} />
          <View style={styles.description}>
            <Text style={styles.text}>
              Las lecciones de RCP de la Cruz Roja te enseñarán a actuar en momentos de estres en
              caso de emergencia.
            </Text>
            <Button 
            onPress={() => CourseCard("RCP")}
              icon={<Icon name="arrow-right" size={20} color="white"  />}
              buttonStyle={styles.button}

            />
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>
          <Text style={{fontWeight: 700}} >Aprende lecciones de quemaduras en minutos</Text>
          </Text>
          <Image source={require(quemaduras)} style={styles.img} />
          <View style={styles.description}>
            <Text style={styles.text}>
              Como actuar en caso de quemaduras, la mejor forma de tratarlas y prevenirlas.
            </Text>
            <Button 
            onPress={() => CourseCard("Quemaduras")}
              icon={<Icon name="arrow-right" size={20} color="white"  />}
              buttonStyle={styles.button}

            />
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>
          <Text style={{fontWeight: 700}} >Atiende heridas en minutos</Text>
          </Text>
          <Image source={require(heridas)} style={styles.img} />
          <View style={styles.description}>
            <Text style={styles.text}>
              Las heridas son comunes en el hogar, aprende a tratarlas de manera segura y eficaz.
            </Text>
            <Button 
            onPress={() => CourseCard("Heridas y cortaduras")}
              icon={<Icon name="arrow-right" size={20} color="white"  />}
              buttonStyle={styles.button}

            />
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>
          <Text style={{fontWeight: 700}} >¿Necesitas un botiquin?</Text>
          </Text>
          <Image source={require(firstaid)} style={styles.img} />
          <View style={styles.description}>
            <Text style={styles.text}>
              Aprende a armar un botiquin de primeros auxilios, y tenlo siempre a la mano.
            </Text>
            <Button 
            onPress={() => CourseCard("Primeros Auxilios")}
              icon={<Icon name="arrow-right" size={20} color="white"  />}
              buttonStyle={styles.button}

            />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "103%",
    height: 200,
    borderRadius: 5,
    marginTop: 13,
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  text:{
    color: "black",
    fontSize: 12,
    textAlign: "justify",
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 10,
  },
  description: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  button: {
    backgroundColor: "#BE1622",
  },
  card: {
    padding: 10,
  },
  title1:{
    fontSize: 20,
    fontWeight: "bold",
  }
});
