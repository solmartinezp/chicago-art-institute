import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { useFavorites } from '../../context/favoriteContext';
import NavigationInterface from '../../utils/interfaces/NavigationInterface';
import Artwork from '../../utils/interfaces/Artwork';
import ArtworkItem from '../../components/ArtworkItem';
import NoFavorites from '../../components/NoFavorites';

function FavoritesScreen({ navigation }: NavigationInterface) {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const { favorites } = useFavorites();

  const handleImageLoad = (id: number) => {
    setLoadedImages(prevState => ({ ...prevState, [id]: true }));
  };

  const renderItem = useCallback(({ item }: { item: Artwork }) => {
    const isFavorite = favorites.has(item.id);

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
        <ArtworkItem
          item={item}
          isFavorite={isFavorite}
          onImageLoad={handleImageLoad}
          loadedImages={loadedImages}
        />
      </TouchableOpacity>
    );
  }, [favorites, loadedImages]);

  if (favorites.size < 1) return <NoFavorites />;

  return (
    <FlashList
      data={Array.from(favorites.values())}
      estimatedItemSize={235}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}

export default FavoritesScreen;