import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';

interface SearchInputProps extends TextInputProps {
  fullWidth?: boolean;
  style?: TextStyle | TextStyle[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  fullWidth = true,
  style,
  ...props
}) => {
  const backgroundColor = useThemeColor({}, 'background');
  const placeholderTextColor = useThemeColor({}, 'placeholderText');
  const textColor = useThemeColor({}, 'text');

  return (
    <TextInput
      {...props}
      placeholderTextColor={placeholderTextColor}
      style={[
        styles.baseInput,
        styles.textStyle,
        fullWidth && styles.fullWidth,
        { backgroundColor, color: textColor },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  baseInput: {
    padding: 8,
    borderRadius: 15,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
  },
  fullWidth: {
    height: 55,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});

export default SearchInput;
