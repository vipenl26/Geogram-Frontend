import {StyleSheet, View, Text} from 'react-native'
import HomePage from '../components/Homepage';
import MapScreen from '../components/MapScreen';
export default function HomeStack(props : any) {
    return (
        <>
            {/* <MapScreen radius={props.radius} changeRadius={props.changeRadius}/> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });