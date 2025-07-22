import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StarRatingProps {
  rating: number;
  size?: number;
}

const STAR_COLOR_FILLED = '#facc15';
const STAR_COLOR_EMPTY = '#d1d5db';

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 22 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }).map((_, index) => (
        <MaterialIcons
          key={index}
          name="star"
          size={size}
          color={index < rating ? STAR_COLOR_FILLED : STAR_COLOR_EMPTY}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: .2,
  },
});

export default StarRating;
