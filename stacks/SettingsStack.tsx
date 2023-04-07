import {StyleSheet, View, Text} from 'react-native'

export default function SettingsStack() {
    return (
        <View style = {styles.container}>
            <Text>
                Settings Stack
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