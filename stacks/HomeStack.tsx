import {StyleSheet, View, Text} from 'react-native'

export default function HomeStack() {
    return (
        <View style = {styles.container}>
            <Text>
                HomeStack
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