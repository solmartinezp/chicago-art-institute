import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search artworks by their title..."
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    borderColor: Colors.secondaryColor,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default SearchBar;
