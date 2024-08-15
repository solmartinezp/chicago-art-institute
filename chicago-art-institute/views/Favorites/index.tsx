import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationInterface from '../../utils/interfaces/NavigationInterface';
import Error from '../../components/Error';
import Colors from '../../utils/colors';

const FAVORITES_KEY = 'favorites';


function FavoritesScreen({ navigation }: NavigationInterface) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(new Set(JSON.parse(storedFavorites)));
        }
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error('Failed to load favorites', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFavorites();
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color={Colors.primaryColor} style={styles.loadingIndicator} />;
  if (isError) return <Error />;

  return (
    <View>
      <Text>Favorites Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default FavoritesScreen;