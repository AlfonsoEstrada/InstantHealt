import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const uri = require("../assets/images/manosconpastillas.jpg");
const firstaid = require("../assets/images/firstaid.jpg");
const heridas = require("../assets/images/heridas.jpg");
const rcp = require("../assets/images/rcp.jpg");
const quemaduras = require("../assets/images/quemaduras.jpg");

const courses = [{
  title: "Primeros Auxilios",
  img: firstaid
},{
  title: "Heridas",
  img: heridas
},{
  title: "RCP",
  img: rcp
},{
  title: "Quemaduras",
  img: quemaduras
},{
  title: "Auxiliar de Farmacia",
  img: uri
}];

export const Courses: React.FC<{ navigation: any }> = ({ navigation }) =>  {
  const [searchText, setSearchText] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);





  
  const searchFilterFunction = (text: string) => {
    setSearchText(text);
    const newData = courses.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredCourses(newData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todos los cursos</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cursos"
            placeholderTextColor="#888"
            onChangeText={text => searchFilterFunction(text)}
            value={searchText}
          />
        </View>
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.courseCard}
            onPress={() => navigation.navigate('CourseList', { title: item.title })}
          >
            <Image source={item.img} style={styles.courseImage} />
            <Text style={styles.courseTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.courseList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    padding: 10,
    paddingTop: 45,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: { 
    fontSize: 24, 
    fontWeight: "bold", 
    paddingBottom: 10 
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 5 
  },
  courseList: { 
    paddingHorizontal: 10 
  },
  row: {
    justifyContent: "space-between",
  },
  courseCard: { 
    width: "48%", 
    marginBottom: 15, 
    alignItems: "center" 
  },
  courseImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 10 
  },
  courseTitle: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
});