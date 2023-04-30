import React from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface FriendRequest {
  id: string;
  name: string;
  status: string;
}

const friendRequestsPage: FriendRequest[] = [
  { id: '1', name: 'Mary', status: 'pending' },
  { id: '2', name: 'Mike', status: 'accepted' },
  { id: '3', name: 'Chris', status: 'rejected' },
];

interface FriendRequestsPageProps {
  navigation: any;
}


const FriendRequestsPage: React.FC<FriendRequestsPageProps> = ({ navigation }) => {
  const renderRequest = ({ item }: { item: FriendRequest }) => (
    <View style={styles.request}>
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.push('Friend Profile', {username: "username", rootuser: "rootuser", uid:"uid", userBio:"userbio",gender: "gender", friends: "friends", fullname: "fullname"})}>
        <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
        <View style={styles.requestInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Friend Requests</Text>
      </View> */}
      <FlatList
        data={friendRequestsPage}
        renderItem={renderRequest}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  list: {
    padding: 20,
  },
  request: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  profileIcon: {
    flex: 1,
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  requestInfo: {
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
  actions: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FriendRequestsPage;
