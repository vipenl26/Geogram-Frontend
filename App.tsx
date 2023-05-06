import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createContext, useEffect, useMemo, useState} from 'react'
import HomePage from './components/Homepage';
import MainNavigator from './stacks/MainNavigator';
import MapScreen from './components/MapScreen';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, DefaultOptions, from, operationName } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

import AsyncStorage from '@react-native-async-storage/async-storage';
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL,
});


export default function App() {
  const [accessToken, setAccessToken] = useState("")
  const authLink = setContext(async(_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const accessToken = await AsyncStorage.getItem('accessToken')
    return {
      headers: {
        Bearer: accessToken ? accessToken : "",
      }
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError || graphQLErrors) {
      logout()
    }
  });


  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(), 
    defaultOptions: defaultOptions
  });

  const logout = () => {
    setAccessToken("")
    AsyncStorage.removeItem('accessToken')
  }

  
  return (
    <ApolloProvider client={client}>
        <MainNavigator accessToken={accessToken} setAccessToken={setAccessToken} logout={logout}/>
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