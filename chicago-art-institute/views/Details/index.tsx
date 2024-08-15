import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

import Links from '../../utils/url';
import Error from '../../components/Error';
import Colors from '../../utils/colors';
import DetailedArtwork from '../../utils/interfaces/DetailedArtwork';
import ArtworkItem from '../../components/ArtworkItem';

const API_URL = Links.API_URL;
const IIIF_BASE_URL = Links.IIIF_BASE_URL;

interface DetailsComponentProps {
  route: {
    params: {
      id: number
    }
  };
}

const DetailsScreen: React.FC<DetailsComponentProps> = ({ route }) => {
  const { id } = route.params;
  const [artwork, setArtwork] = useState<DetailedArtwork | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);


  useEffect(() => {
    const fetchArtwork = async (id: number) => {
      try {
        const response = await axios.get<DetailedArtwork>(`${API_URL}/${id}`);
        setArtwork(response.data);
        setError(false);
      } catch (error) {
       console.error('Failed to load', error);
       setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork(id);

  }, []);

  if (loading) return <ActivityIndicator size="large" color={Colors.primaryColor} style={styles.loadingIndicator} />;;
  if (error) return <Error />;

  return (
    <View>
      <Text>{id}</Text>
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