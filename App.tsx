import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/Homepage';
import MainNavigator from './stacks/MainNavigator';
import MapScreen from './components/MapScreen';
export default function App() {
  return (
    <>
      <MainNavigator/>
    </>
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
