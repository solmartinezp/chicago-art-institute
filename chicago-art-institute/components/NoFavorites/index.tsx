import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Colors from '../../utils/colors';

const NoFavorites: React.FC = () => (
    <View style={styles.container}>
        <MaterialIcons
            name="favorite-border"
            size={30}
            color={Colors.secondaryColor}
          />
        <Text style={styles.text}>Aún no has guardado favoritos.</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: Colors.secondaryColor,
        marginTop: '2%'
    }
  });

export default NoFavorites;