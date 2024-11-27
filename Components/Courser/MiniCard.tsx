import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface MiniCardProps {
  videoId: string;
  title: string;
  channel: string;
  onPress: () => void;
}

const MiniCard: React.FC<MiniCardProps> = ({ videoId, title, channel, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} ellipsizeMode='tail' numberOfLines={2}>
          {channel}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default MiniCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});