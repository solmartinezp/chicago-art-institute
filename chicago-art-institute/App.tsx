import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/Home';
import DetailsScreen from './views/Details';
import FavoritesScreen from './views/Favorites';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" options={{ headerShown: false, title: '' }} component={TabNavigator} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => route.name === 'Inicio' ? <Entypo name="home" size={24} color={ focused ? '#b50938' : '#494848' } /> : <MaterialIcons name="favorite" size={24} color={ focused ? '#b50938' : '#494848' } />
        ,
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              style={{

                color: focused ? '#b50938' : '#494848',
                fontFamily: 'Roboto',
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              {route.name}
            </Text>
          );
        }
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
}

export default App;