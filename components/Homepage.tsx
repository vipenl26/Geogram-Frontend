import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MainButton from './MainButton';
import MapScreen from './MapScreen';


const HomePage = (props : any) => (
  <View>
    {/* <MainButton/> */}
    <MapScreen radius={props.radius} changeRadius={props.changeRadius}/>
  </View>
);


export default HomePage;
