import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import NavigationInterface from '../../interfaces/NavigationInterface';
import Artwork from '../../interfaces/Artwork';
import { FlashList } from '@shopify/flash-list';

const PAGE_SIZE = 20;
const API_URL = 'https://api.artic.edu/api/v1/artworks';

const fetchArtworks = async ({ pageParam = 1 }) => {
  const response = await axios.get(`${API_URL}?page=${pageParam}&limit=${PAGE_SIZE}`);
  return response.data;
};

const HomeScreen: React.FC  = ({ navigation }: NavigationInterface) => {
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
    
      const renderItem = useCallback(({ item }: { item: Artwork }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ), []);
    
      const getItemLayout = (data: Artwork[] | null | undefined, index: number) => ({
        length: 200, // Height of each item
        offset: 200 * index, // Height of each item * index
        index,
      });
    
      if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
      if (isError) return <Text>Error loading data</Text>;
    
      return (
        <FlatList
          data={data?.pages.flatMap(page => page.data) || []}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          getItemLayout={getItemLayout}
        />
      );
}

const styles = StyleSheet.create({
    itemContainer: {
      margin: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    image: {
      width: Dimensions.get('window').width - 20,
      height: 200,
    },
  });

export default HomeScreen;
