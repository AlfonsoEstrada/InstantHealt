import { Text, View , StyleSheet } from "react-native"
import React from "react"
import { Courses } from "@/Components/Courses";
import SearchComponent from "@/Components/SearchComponent";



const Course = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <SearchComponent navigation={navigation} />
        </View>
    );
}

export default Course;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})