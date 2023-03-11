import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const SearchComponent = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const handleSearch = () => {
		axios({
			method: 'get',
			maxBodyLength: Infinity,
			url: `https://api.intra.42.fr/v2/users/${searchQuery.toLowerCase()}`,
			headers: {
				'Authorization': 'Bearer 20e680e445e3ee120ffab3f8fc673d2aad5227bd6ae3048696d7a4789cb6de74', 
				'Cookie': '_intra_42_session_production=64faa32f79df99f4d4222d0f74f0bda4'
			}
		  })
			.then(response => {
				setSearchResults(response.data);
			})
			.catch(error => {
				console.error(error);
				alert('User not found');
			});
	};
	return (
	<View>
		<TextInput 
		style={styles.search}
		placeholder="Search"
		autoCapitalize='none'
		keyboardType='default'
		value={searchQuery}
		onChangeText={text => setSearchQuery(text)}
		/>
		<TouchableOpacity onPress={handleSearch}>
		<Text>Search</Text>
		</TouchableOpacity>
		{searchResults && (
		<Text>{searchResults.usual_full_name}</Text>
		)}
	</View>
	);
};

const styles = {
	search: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
	},
};

export default SearchComponent;
