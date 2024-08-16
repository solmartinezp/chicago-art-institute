import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFavorites } from '../../context/favoriteContext';
import NavigationInterface from '../../utils/interfaces/NavigationInterface';
import Error from '../../components/Error';
import Artwork from '../../utils/interfaces/Artwork';
import Colors from '../../utils/colors';
import Links from '../../utils/url';
import ArtworkItem from '../../components/ArtworkItem';

const PAGE_SIZE = 20;
const API_URL = Links.API_URL;
const FAVORITES_KEY = 'favorites';

const fetchArtworks = async ({ pageParam = 1 }) => {
  const response = await axios.get(`${API_URL}?page=${pageParam}&limit=${PAGE_SIZE}`);
  return response.data;
};

const HomeScreen: React.FC<NavigationInterface> = ({ navigation }) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery('artworks', fetchArtworks, {
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.pagination.total / PAGE_SIZE);
      const nextPage = pages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const handleFavoriteToggle = async (item: Artwork) => {
    if (favorites.has(item.id)) {
      await removeFavorite(item.id);
    } else {
      await addFavorite(item);
    }
  };

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
          onFavoriteToggle={() => handleFavoriteToggle(item)}
          onImageLoad={handleImageLoad}
          loadedImages={loadedImages}
        />
      </TouchableOpacity>
    );
  }, [favorites, loadedImages]);

  if (isLoading) return <ActivityIndicator size="large" color={Colors.primaryColor} style={styles.loadingIndicator} />;
  if (isError) return <Error />;

  return (
    <FlashList
      data={data?.pages.flatMap(page => page.data) || []}
      estimatedItemSize={235}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: '2.5%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    alignItems: 'center',
    marginBottom: '2%',
    marginTop: '5%',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 10
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2.5%',
    paddingLeft: '4%',
    paddingRight: '4%'
  },
  favorite: {
    marginBottom: '1.5%',
  },
  title: {
    width: '70%',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.secondaryColor
  },
  description: {
    fontSize: 14,
    paddingRight: '2.5%',
    paddingLeft: '2.5%',
    paddingBottom: '5%'
  },
  imageContainer: {
    position: 'relative',
    width: Dimensions.get('window').width - 20,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingIndicator: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
});


export default HomeScreen;