// components/ui/HorizontalScrollList.tsx
import React from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';

interface HorizontalScrollListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

function HorizontalScrollList<T>({
  data,
  renderItem,
  keyExtractor,
  style,
  contentContainerStyle,
}: HorizontalScrollListProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={[styles.container, contentContainerStyle]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingHorizontal: 12,
  },
});

export default HorizontalScrollList;
