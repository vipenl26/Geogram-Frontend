import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const FriendIndicator = ({ isFriend, isPending }) => {
  return (
    <View style={[styles.container, isFriend && styles.containerFriend, isPending && styles.containerPending]}>
      <Text style={[styles.text, isFriend && styles.textFriend]}>
        {isFriend ? 'Friends' : isPending ? 'Request Pending': 'Not Friends'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF7373',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerFriend: {
    backgroundColor: '#8BC34A',
  },
  containerPending: {
    backgroundColor: '#eed202'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  textFriend: {
    color: 'white',
  },
});

export default FriendIndicator;
