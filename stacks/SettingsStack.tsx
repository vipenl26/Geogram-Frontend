import {StyleSheet, View, Text, Button} from 'react-native'
interface SettingsProps {
    setAccessToken: (accessToken: string) => void
}
const SettingsStack: React.FC<SettingsProps> = ({setAccessToken})=> {
    return (
        <View style = {styles.container}>
            <Text>
                Settings Stack
            </Text>
            <Button
                onPress={() => {setAccessToken("")}}
                title="log out"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
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

export default SettingsStack