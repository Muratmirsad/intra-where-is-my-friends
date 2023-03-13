import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import getData from '../storage/getData';
import FriendList from './FriendList';

export default function Home()
{
	const [friends, setFriends] = useState([]);
	getData('friends').then((friends) => {
		setFriends(friends);
		console.log(friends);
	});
	return(
		<View style={styles.container}>
			<FriendList />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 5,
	},
});