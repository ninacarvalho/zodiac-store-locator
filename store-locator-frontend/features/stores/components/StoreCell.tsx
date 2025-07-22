import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StarRating } from '../../../components/ui/StarRating';
import { Store } from '../types';

interface StoreCellProps {
  store: Store;
  showDescription?: boolean;
  onPress?: () => void;
}

const THUMBNAIL_SIZE = 85;

const StoreCell: React.FC<StoreCellProps> = ({ store, showDescription = false, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: store.imageUrl }} style={styles.thumbnail} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{store.name}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingValue}>{store.rating}</Text>
          <StarRating rating={store.rating} />
        </View>
        {showDescription && (
          <ScrollView style={styles.scrollBox} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.description}>{store.description}</Text>
          </ScrollView>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minHeight: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 8,
    borderRadius: 12,
  },
  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 160,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingValue: {
    fontSize: 18,
  },
  scrollBox: {
    marginTop: 4,
  },
  scrollContent: {
    paddingRight: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 18,
  },
});

export default StoreCell;
