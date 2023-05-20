import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ChatScreen from '../components/ChatScreen';
import ChatListScreen from '../components/ChatListScreen';

// Define the stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatList">
        <Stack.Screen
          name="ChatList"
          component={ChatListScreen}
          options={{ title: 'Chat List' }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({ title: route.params.username })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
