import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';

const Error: React.FC = () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Ups! There's been an error...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  errorText: {
    fontSize: 20,
    width: '90%',
    textAlign: 'center',
    color: Colors.primaryColor,
  }
});

export default Error;