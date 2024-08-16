// FavoriteContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Artwork from '../utils/interfaces/Artwork';

const FAVORITES_KEY = 'favorites';

interface FavoriteContextType {
  favorites: Map<number, Artwork>;
  addFavorite: (item: Artwork) => void;
  removeFavorite: (id: number) => void;
  loadFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Map<number, Artwork>>(new Map());

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        const favoritesArray: Artwork[] = JSON.parse(storedFavorites);
        const favoritesMap = new Map<number, Artwork>(
          favoritesArray.map(item => [item.id, item])
        );
        setFavorites(favoritesMap);
      }
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };

  const addFavorite = async (item: Artwork) => {
    const updatedFavorites = new Map(favorites);
    updatedFavorites.set(item.id, item);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(updatedFavorites.values())));
  };

  const removeFavorite = async (id: number) => {
    const updatedFavorites = new Map(favorites);
    updatedFavorites.delete(id);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(updatedFavorites.values())));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, loadFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};