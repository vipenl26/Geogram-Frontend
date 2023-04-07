import {StyleSheet, View, Text} from 'react-native'

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