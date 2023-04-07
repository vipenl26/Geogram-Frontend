import {StyleSheet, View, Text} from 'react-native'

export default function ProfileStack() {
    return (
        <View style = {styles.container}>
            <Text>
                ProfileStack
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