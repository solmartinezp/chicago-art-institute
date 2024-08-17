import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { useQuery } from 'react-query';

// context
import { useFavorites } from '../../context/favoriteContext';

// utils
import Links from '../../utils/url';
import Colors from '../../utils/colors';

// components
import Error from '../../components/Error';
import DetailedArtworkItem from '../../components/DetailedArtworkItem';

// interfaces
import DetailedArtwork from '../../utils/interfaces/DetailedArtwork';
import DetailsComponentProps from '../../utils/interfaces/DetailedsComponentProps';

const fetchArtwork = async (id: number): Promise<DetailedArtwork> => {
  const response = await axios.get<DetailedArtwork>(`${Links.API_URL}/${id}`);
  return response.data;
};

const DetailsScreen: React.FC<DetailsComponentProps> = ({ route }) => {
  const { id } = route.params;

  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const { favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { data: artwork, isLoading, isError } = useQuery(['artwork', id], () => fetchArtwork(id), {
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    setIsFavorite(favorites.has(id));
  }, []);

  if (isLoading) return <ActivityIndicator size="large" color={Colors.primaryColor} style={styles.loadingIndicator} />;;
  if (isError) return <Error />;

  return (
    <View>
        {artwork && (
        <DetailedArtworkItem
          item={artwork}
          isFavorite={isFavorite}
          onImageLoad={handleImageLoad}
          loadedImages={loadedImages}
        />
      )}
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

export default DetailsScreen;