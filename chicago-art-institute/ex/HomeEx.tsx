  // const renderItem = useCallback(({ item }: { item: Artwork }) => {
  //   const imageUrl = `${IIIF_BASE_URL}/${item.image_id}/full/843,/0/default.jpg`;
  //   const isFavorite = favorites.has(item.id);

  //   return (
  //     <TouchableOpacity
  //       style={styles.itemContainer}
  //       onPress={() => navigation.navigate('Details', { id: item.id })}  
  //     >
  //       <View style={styles.header}>
  //         <Text style={styles.title}>{item.title}</Text>
  //         <TouchableOpacity
  //           style={styles.favorite}
  //           onPress={() => handleFavoriteToggle(item.id)}
  //         >
  //           <MaterialIcons
  //             name={isFavorite ? 'favorite' : 'favorite-border'}
  //             size={30}
  //             color={isFavorite ? Colors.primaryColor : Colors.secondaryColor}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.imageContainer}>
  //         {!loadedImages[item.id] && <ActivityIndicator size="small" color={Colors.primaryColor} style={styles.loadingIndicator} />}
  //         <Image
  //           source={{ uri: imageUrl }}
  //           style={styles.image}
  //           resizeMode="cover"
  //           onLoad={() => handleImageLoad(item.id)}
  //         />
  //       </View>
  //       <Text style={styles.description}>{(removeHtmlTags(item.description) || removeHtmlTags(item.short_description))  || removeHtmlTags(item.provenance_text)}</Text>
  //     </TouchableOpacity>
  //   );
  // }, [loadedImages, favorites]);