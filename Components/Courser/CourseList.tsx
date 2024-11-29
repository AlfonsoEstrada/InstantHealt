import React, { useState, useEffect, useCallback, useMemo } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
  Text,
  Button,
} from "react-native";
import MiniCard from "./MiniCard";
import { useRoute, RouteProp } from "@react-navigation/native";
import * as Progress from "react-native-progress";

type RootStackParamList = {
  CourseList: { title: string };
};

type CourseListRouteProp = RouteProp<RootStackParamList, "CourseList">;

const CourseListComponent: React.FC<{ navigation: any }> = ({ navigation }) =>  {
  const route = useRoute<CourseListRouteProp>();
  const { title } = route.params;

  const [mainVideoId, setMainVideoId] = useState<string | null>(null);
  const [minicardData, setMinicardData] = useState<any[]>([]);
  const [completedVideos, setCompletedVideos] = useState<number>(0);

  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  const totalVideos = minicardData.length;

  const progressPercentage = totalVideos
    ? Math.round((completedVideos / totalVideos) * 100)
    : 0;

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("¡El video ha terminado de reproducirse!");
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

      .then((res) => res.json())
      .then((data) => {
        setMinicardData(data.items || []);
        if (data.items && data.items.length > 0) {
          setMainVideoId(data.items[0].id.videoId);
        }
        setLoading(false);
      })
      .catch((error) => {
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

  const memoizedMiniCardData = useMemo(
    () => minicardData.slice(1),
    [minicardData]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerGradient}>
        <Button
        title="Menu"
        onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>{title}</Text>
        </View>
      <View style={styles.videoSection}>
        {mainVideoId && (
          <View>
            {loading}
            <YoutubePlayer
              webViewStyle={styles.video}
              height={Dimensions.get("window").width * 0.5625} // 16:9 aspect ratio
              play={playing}
              videoId={`${mainVideoId}`}
              onChangeState={onStateChange}
            />
          </View>
        )}
      </View>
      <View style={styles.progressSection}>
        <Progress.Bar
          progress={progressPercentage / 100}
          width={Dimensions.get("window").width * 0.8}
          color="#FF5A5F"
          unfilledColor="#F1F1F1"
          borderWidth={0}
          height={12}
          borderRadius={10}
        />
        <Text style={styles.progressText}>
          Progreso: {progressPercentage}%
        </Text>
        {progressPercentage === 100 && (
          <Text style={styles.completionMessage}>
            ¡Felicidades! Has completado el curso.
          </Text>
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
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
};

export default CourseListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#BE1622"
  },
  headerText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  videoSection: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginVertical: 15,
  },
  video: {
    width: Dimensions.get("window").width,
  },
  progressSection: {
    padding: 20,
    alignItems: "center",
  },
  progressText: {
    marginTop: 8,
    fontSize: 16,
    color: "#333",
  },
  completionMessage: {
    marginTop: 10,
    fontSize: 18,
    color: "#FF5A5F",
    fontWeight: "bold",
  },
  listSection: {
    flex: 1,
    padding: 10,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
});
