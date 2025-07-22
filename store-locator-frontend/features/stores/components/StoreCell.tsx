import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StarRating } from '../../../components/ui/StarRating';
import { Store } from '../types';

interface StoreCellProps {
  store: Store;
  onPress?: () => void;
}

const THUMBNAIL_SIZE = 85;

const StoreCell: React.FC<StoreCellProps> = ({ store, onPress }) => {
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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
});

export default StoreCell;
