import {StyleSheet, View, Text} from 'react-native'
import {useState} from 'react'
import HomePage from '../components/Homepage';
import MapScreen from '../components/MapScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import ProfileScreen from '../components/ProfileScreen';
const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={({navigation})=>({
          headerTitle: () => <Text style={styles.title}>Home</Text>
        })}
      />

    <Stack.Screen
        name="Profile Page"
        component={ProfileScreen}
        options={({navigation})=>({
          headerTitle: () => <Text style={styles.title}>Profile Page</Text>
        })}
      />


    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
      },
  });