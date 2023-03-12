import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { handleSearch } from '../api/handleSearch';
import UserCard from './UserCard';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

return (
    <View>
		<View style={styles.search}>
			<TextInput
			style={styles.input}
			placeholder="Search"
			autoCapitalize='none'
			keyboardType='default'
			value={searchQuery}
			onChangeText={text => setSearchQuery(text)}
			/>
			<TouchableOpacity style={styles.button} onPress={() => {
				if (searchQuery.length > 0) {
					handleSearch(searchQuery, setSearchResults);
				}
			}}>
			<Text>Search</Text>
			</TouchableOpacity>
		</View>
		<View style={styles.container}>
			{searchResults && (
			<UserCard user={searchResults} />
			)}
		</View>
    </View>
  );
};

// make styled input field and button for search make search input and button side by side
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	search: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	input: {
		height: 40,
		width: 275,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		margin: 12,
		marginLeft: 0,
	},
});

export default SearchComponent;
