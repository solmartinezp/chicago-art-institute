import React from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../utils/colors';
import removeHtmlTags from '../../utils/regex';
import DetailedArtwork from '../../utils/interfaces/DetailedArtwork';
import Artwork from '../../utils/interfaces/Artwork';
import Links from '../../utils/url';
import { useFavorites } from '../../context/favoriteContext';

interface DetailedArtworkItemProps {
  item: DetailedArtwork;
  isFavorite: boolean;
  onImageLoad: (id: number) => void;
  loadedImages: { [key: string]: boolean };
}

const convertToArtwork = (detailedArtwork: DetailedArtwork): Artwork => {
    return {
      id: detailedArtwork.data.id,
      title: detailedArtwork.data.title,
      image_id: detailedArtwork.data.image_id,
      description: detailedArtwork.data.description,
      short_description: '',
      provenance_text: '',
    };
  };

const DetailedArtworkItem: React.FC<DetailedArtworkItemProps> = ({ item, isFavorite, onImageLoad, loadedImages }) => {
  const { addFavorite, removeFavorite } = useFavorites();

  const imageUrl = `${Links.IIIF_BASE_URL}/${item.data.image_id}/full/843,/0/default.jpg`;

  const description = removeHtmlTags(item.data.description || '');
  const publication_history = removeHtmlTags(item.data.publication_history || '');

  const handleFavoriteToggle = () => {
    const artwork = convertToArtwork(item);
    if (isFavorite) {
      removeFavorite(artwork.id);
    } else {
      addFavorite(artwork);
    }
  };

  

  return (
    <ScrollView style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        {!loadedImages[item.data.id] && 
          <ActivityIndicator size="small" color={Colors.primaryColor} style={styles.loadingIndicator} />
        }
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onLoad={() => onImageLoad(item.data.id)}
        />
      </View>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>{item.data.title}</Text>
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
        
        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>
                Artist:
            </Text>
            <Text style={styles.infoText}>
                {item.data.artist_title}
            </Text>
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>
                Gallery:
            </Text>
            <Text style={styles.infoText}>
                {item.data.gallery_title}
            </Text>
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>
                Origin:
            </Text>
            <Text style={styles.infoText}>
                {item.data.place_of_origin}
            </Text>
        </View>

        <View style={styles.descriptionContainer}>
            <Text style={styles.infoTitle}>
                Inscriptions:
            </Text>
            {item.data.inscriptions ? (
                <Text style={styles.infoText}>
                    {item.data.inscriptions}
                </Text>
            ) : (
                <Text style={styles.infoText}>No inscriptions found.</Text>
            )}
        </View>

        <View style={styles.descriptionContainer}>
            <Text style={styles.infoTitle}>
                Publication History:
            </Text>
            {publication_history ? (
                <Text style={styles.infoText}>
                    {publication_history}
                </Text>
            ) : (
                <Text style={styles.infoText}>No publication history found.</Text>
            )}
        </View>

        {description && (
            <View style={styles.descriptionContainer}>
                <Text style={styles.infoTitle}>Description:</Text>
                <Text style={styles.infoText}>
                    {description}
                </Text>
            </View>
        )}

        <Text style={styles.additionalInfo}>
            {item.data.thumbnail.alt_text}
        </Text>
        <Text style={styles.additionalInfo}>{item.data.medium_display}</Text>
        <Text style={styles.lastAdditionalInfo}>{item.data.credit_line}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  headerTitle: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '5%'
  },
  title: {
    position: 'relative',
    width: '70%',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  description: {
    fontSize: 14,
    paddingTop: '5%',
    width: '85%',
    alignSelf: 'center',
    textAlign: 'left'
  },
  additionalInfo: {
    fontSize: 14,
    color: Colors.secondaryColor,
    marginTop: '1%',
    width: '90%',
    alignSelf: 'center',
  },
  lastAdditionalInfo: {
    fontSize: 14,
    color: Colors.secondaryColor,
    marginTop: '1%',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  imageContainer: {
    width: '95%',
    position: 'relative',
    margin: 'auto',
    marginTop: '5%',
    backgroundColor: '#fff',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 15,
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
    height: 300,
  },
  infoContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  infoText: {
    fontSize: 16,
    marginLeft: '1%',
  },
  descriptionContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginBottom: '2%',
  },
  loadingIndicator: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailedArtworkItem;
