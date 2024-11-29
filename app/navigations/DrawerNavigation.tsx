import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from '@/Components/UserPanel/Profile';
import Certifies from '@/Components/UserPanel/Certifies';


const Drawer = createDrawerNavigator();

import { DrawerContentComponentProps } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import { router } from 'expo-router';
import Login from '../login';


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerActiveTintColor: '#BE1622',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: { marginLeft: 0, fontSize: 20 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
            drawerLabel: "Home",
            title: "Home",
            headerShadowVisible: false,
            drawerIcon: () => (
                <Icon
                 name="home" size={24} color="black"
                />
            ),
        }}
        />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: "Perfil",
          drawerIcon: () => (
            <Icon name="user" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Certifies"
        component={Certifies}
        options={{
          drawerLabel: "Certificados",
          drawerIcon: () => (
            <Icon name="cog" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerLabel: "Cerrar Sesion",
          drawerIcon: () => (
            <Icon name="sign-out" size={24} color="black" />
          ),
        }} 
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#BE1622',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#fff',
  },
});