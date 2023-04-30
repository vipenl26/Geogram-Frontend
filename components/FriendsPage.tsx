import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Friend {
  id: string;
  name: string;
  status: string;
}

const friends: Friend[] = [
  { id: '1', name: 'John', status: 'online' },
  { id: '2', name: 'Jane', status: 'offline' },
  { id: '3', name: 'Mike', status: 'online' },
  { id: '4', name: 'Chris', status: 'offline' },
  { id: '5', name: 'Mary', status: 'online' },
  { id: '6', name: 'Kate', status: 'offline' },
];

interface FriendsListProps {
  navigation: any;
}

const FriendsPage: React.FC<FriendsListProps> = ({ navigation }) => {
  const renderFriend = ({ item }: { item: Friend }) => (
    <TouchableOpacity style={styles.friendItem} onPress={() => navigation.navigate('Friend Profile', { friend: item })}>
      <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
      <View style={styles.friendInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <Ionicons name="ios-arrow-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.friendsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  friendsList: {
    padding: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});
export default FriendsPage;
