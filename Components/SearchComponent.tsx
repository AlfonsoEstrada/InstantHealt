import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, FlatList } from "react-native";
import MiniCard from './Courser/MiniCard'; // Ajusta la ruta según sea necesario
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const SearchComponent: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [value, setValue] = useState('');
  
  
  interface MiniCardData {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      channelTitle: string;
    };
  }

  const [minicardData, setMinicardData] = useState<MiniCardData[]>([]);
  const fetchData = () => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyBiKGtjZwS8I66eQ4Q-m1--qPGmiew0700`)
      .then(res => res.json())
      .then(data => {
        setMinicardData(data.items);
        console.log(data);
      });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput 
          style={styles.searchInput}
          value={value}
          onChangeText={(text) => setValue(text)}
          placeholder="Buscar..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => fetchData()}>
          <Ionicons name='send' size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={minicardData}
        renderItem={({ item }) => (
          <MiniCard
            videoId={item.id.videoId}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            onPress={() => navigation.navigate("Chapter", { videoId: item.id.videoId })}
          />
        )}
        keyExtractor={item => item.id.videoId}
        contentContainerStyle={styles.flatListContent}
      />
    </GestureHandlerRootView>
  );
}

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});