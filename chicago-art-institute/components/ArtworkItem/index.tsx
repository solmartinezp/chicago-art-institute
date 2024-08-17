import React from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// context
import { useFavorites } from '../../context/favoriteContext';

// utils
import Colors from '../../utils/colors';
import removeHtmlTags from '../../utils/regex';
import Links from '../../utils/url';
import { isArtwork } from '../../utils/typeGuard';

// interfaces
import Artwork from '../../utils/interfaces/Artwork';
import ArtworkItemProps from '../../utils/interfaces/ArtworkItemProps';

const ArtworkItem: React.FC<ArtworkItemProps> = ({ item, isFavorite, onImageLoad, loadedImages, detailed }) => {
  const { addFavorite, removeFavorite } = useFavorites();

  const imageUrl = `${Links.IIIF_BASE_URL}/${item.image_id}/full/843,/0/default.jpg`;

  const description = isArtwork(item)
  && (removeHtmlTags(item.description || '') || removeHtmlTags(item.short_description || '')) || removeHtmlTags(item.provenance_text || '');

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(item.id);
    } else {
      addFavorite(item as Artwork);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        {!loadedImages[item.id] && <ActivityIndicator size="small" color={Colors.primaryColor} style={styles.loadingIndicator} />}
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onLoad={() => onImageLoad(item.id)}
        />
      </View>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity
            onPress={handleFavoriteToggle}
          >
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={30}
              color={isFavorite ? Colors.primaryColor : Colors.secondaryColor}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2.5%',
    marginTop: '2.5%',
    paddingBottom: '5%',
    borderRadius: 10,
    backgroundColor: Colors.backgroundCard,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  headerTitle: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'relative',
    width: '70%',
    marginTop: '2%',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },
  description: {
    fontSize: 14,
    paddingTop: '5%',
    width: '85%',
    alignSelf: 'center',
    textAlign: 'left'
  },
  imageContainer: {
    width: '40%',
    position: 'relative',
    margin: 'auto',
    backgroundColor: '#fff',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 15,
    marginLeft: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
  },
  image: {
    width: '100%',
    height: 100,
  },
  loadingIndicator: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    paddingTop: 15,
  },
});

export default ArtworkItem;