import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createContext} from 'react'
import HomePage from './components/Homepage';
import MainNavigator from './stacks/MainNavigator';
import MapScreen from './components/MapScreen';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//@ts-ignore
import {BACKEND_URL} from "@env"
const client = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache()
});
export default function App() {
  const AppContext = createContext({});
  return (
    <ApolloProvider client={client}>
        <MainNavigator/>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
AppRegistry.registerComponent('MyApplication', () => App);