import {StyleSheet, View, Text} from 'react-native'
// import { createStackNavigator } from 'react-navigation-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

export default function ChatStack() {
    return (
        <View style = {styles.container}>
            <Text>
                ChatStack
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });