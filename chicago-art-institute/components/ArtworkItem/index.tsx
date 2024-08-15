import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Colors from '../../utils/colors';
import removeHtmlTags from '../../utils/regex';
import DetailedArtwork from '../../utils/interfaces/DetailedArtwork';
import Artwork from '../../utils/interfaces/Artwork';
import Links from '../../utils/url';
import { isArtwork } from '../../utils/typeGuard';

interface ArtworkItemProps {
  item: DetailedArtwork | Artwork;
  isFavorite: boolean;
  onFavoriteToggle: (id: number) => void;
  onImageLoad: (id: number) => void;
  loadedImages: { [key: string]: boolean };
  detailed? : boolean;
}

const ArtworkItem: React.FC<ArtworkItemProps> = ({ item, isFavorite, onFavoriteToggle, onImageLoad, loadedImages, detailed }) => {
  const imageUrl = `${Links.IIIF_BASE_URL}/${item.image_id}/full/843,/0/default.jpg`;

  const description = isArtwork(item)
    ? (removeHtmlTags(item.description || '') || removeHtmlTags(item.short_description || '')) || removeHtmlTags(item.provenance_text || '')
    : removeHtmlTags(item.description || '');

  return (
    <View
      style={styles.itemContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
          style={styles.favorite}
          onPress={() => onFavoriteToggle(item.id)}
        >
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={30}
            color={isFavorite ? Colors.primaryColor : Colors.secondaryColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {!loadedImages[item.id] && <ActivityIndicator size="small" color={Colors.primaryColor} style={styles.loadingIndicator} />}
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onLoad={() => onImageLoad(item.id)}
        />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: '2.5%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    alignItems: 'center',
    marginBottom: '2%',
    marginTop: '5%',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2.5%',
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  favorite: {
    marginBottom: '1.5%',
  },
  title: {
    width: '70%',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.secondaryColor,
  },
  description: {
    fontSize: 14,
    paddingRight: '2.5%',
    paddingLeft: '2.5%',
    paddingBottom: '5%',
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
    alignItems: 'center',
  },
});

export default ArtworkItem;
