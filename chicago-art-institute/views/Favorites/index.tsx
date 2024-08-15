import React from 'react';
import { View, Text, Button } from 'react-native';
import NavigationInterface from '../../interfaces/NavigationInterface';

function FavoritesScreen({ navigation }: NavigationInterface) {
  return (
    <View>
      <Text>Favorites Screen</Text>
      {/* <Button title="Go to Details" onPress={() => navigation.navigate('Details')} /> */}
    </View>
  );
}

export default FavoritesScreen;