import {View, Text, StyleSheet} from 'react-native'

const FriendsStack = () => {
    return (
        <View style = {styles.container}>
            <Text>
                Friends Stack
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


export default FriendsStack