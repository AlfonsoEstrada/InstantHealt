import React, { useState, useEffect, useCallback, useMemo } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import MiniCard from "./MiniCard";
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  CourseList: { title: string };
};

type CourseListRouteProp = RouteProp<RootStackParamList, 'CourseList'>;

const CourseListComponent: React.FC = () => {
  const route = useRoute<CourseListRouteProp>();
  const { title } = route.params;

  const [mainVideoId, setMainVideoId] = useState<string | null>(null);
  const [minicardData, setMinicardData] = useState<any[]>([]);
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("El video ha terminado de reproducirse!");
    } else if (state === "playing") {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [title]);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${title}&type=video&key=AIzaSyBiKGtjZwS8I66eQ4Q-m1--qPGmiew0700`)
      .then(res => res.json())
      .then(data => {
        setMinicardData(data.items || []);
        if (data.items && data.items.length > 0) {
          setMainVideoId(data.items[0].id.videoId);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setMinicardData([]);
        setLoading(false);
      });
  }, [title]);

  const handleVideoSelect = useCallback((videoId: string) => {
    setMainVideoId(videoId);
    setPlaying(true);
    setLoading(true);
  }, []);

  const memoizedMiniCardData = useMemo(() => minicardData.slice(1), [minicardData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.videoSection}>
        {mainVideoId && (
          <View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <YoutubePlayer
              webViewStyle={styles.video}
              height={Dimensions.get('window').width * 0.5625} // 16:9 aspect ratio
              play={playing}
              videoId={`${mainVideoId}`}
              onChangeState={onStateChange}
            />
          </View>
        )}
      </View>
      <View style={styles.listSection}>
        <Text style={styles.recommendationsTitle}>Episodios</Text>
        <FlatList
          data={memoizedMiniCardData}
          renderItem={({ item }) => (
            <MiniCard
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
              onPress={() => handleVideoSelect(item.id.videoId)}
            />
          )}
          keyExtractor={(item) => item.id.videoId}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

export default CourseListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingVertical: 10,
    backgroundColor: '#BE1622',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  videoSection: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  listSection: {
    flex: 1,
    paddingTop: 30,
    padding: 10,
  },
  video: {
    width: Dimensions.get('window').width,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
});