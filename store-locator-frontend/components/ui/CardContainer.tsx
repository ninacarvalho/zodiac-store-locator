import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardContainer: React.FC<CardContainerProps> = ({ children, style }) => {
  const backgroundColor = useThemeColor({}, 'background');

  return <View style={[styles.card, { backgroundColor }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    maxWidth: 255,
    width: 255,
    flexShrink: 0,
    flexGrow: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default CardContainer;
