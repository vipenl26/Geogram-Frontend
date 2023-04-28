import {StyleSheet, View, Text} from 'react-native'
import HomePage from '../components/Homepage';

export default function HomeStack(props : any) {
    return (
        <View style = {styles.container}>
            <HomePage radius={props.radius} changeRadius = {props.changeRadius}/>
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