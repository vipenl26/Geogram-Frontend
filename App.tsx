import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createContext, useEffect, useMemo, useState} from 'react'
import HomePage from './components/Homepage';
import MainNavigator from './stacks/MainNavigator';
import MapScreen from './components/MapScreen';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


//@ts-ignore
import {BACKEND_URL} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: BACKEND_URL,
});


export default function App() {
  const [accessToken, setAccessToken] = useState("")
  const authLink = setContext(async(_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const accessToken = await AsyncStorage.getItem('accessToken')
    console.log("access token inside is" + accessToken)
    return {
      headers: {
        Bearer: accessToken ? accessToken : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });



  
  console.log(accessToken + "is access token outside")
  return (
    <ApolloProvider client={client}>
        <MainNavigator accessToken={accessToken} setAccessToken={setAccessToken}/>
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