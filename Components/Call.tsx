import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const contacts = [{
  phoneNumber: '5567992030',
  name: 'Bomberos Cancun',
},{
  phoneNumber: '5567982070',
  name: 'Cruz Roja Cancun',
},{
  phoneNumber: '9985674567',
  name: 'Policia Cancun',
},{
  phoneNumber: '9028765432',
  name: 'Bomberos Cancun',
}];

function CallComponent() {


  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const searchFilterFunction = (text: string) => {
    setSearchText(text);
    const newData = contacts.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.phoneNumber}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredContacts(newData);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Directorio</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="¿En dónde estás?"
            placeholderTextColor="#888"
            onChangeText={text => searchFilterFunction(text)}
            value={searchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {filteredContacts.map((contact, index) => (
        <View key={index} style={styles.contactCard}>
          <View>
            <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
            <Text style={styles.contactName}>{contact.name}</Text>
          </View>
          <Icon name="phone" size={20} color="#BE1622" style={{alignSelf:'center'}}  />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BE1622',
  },
  header: {
    paddingHorizontal: 20,
    width: "100%",
    padding: 10,
    paddingBottom: 10,
    paddingTop: 45,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    color: 'black',
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  contactCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#e4e4eb',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  contactPhone: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contactName: {
    fontSize: 14,
    color: '#555',
  },
});

export default CallComponent;