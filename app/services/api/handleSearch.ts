import axios from 'axios';

export const handleSearch = (searchQuery, setSearchResults) => {
	axios({
		method: 'get',
		maxBodyLength: Infinity,
		url: `https://api.intra.42.fr/v2/users/${searchQuery.toLowerCase()}`,
		headers: {
			'Authorization': 'Bearer f9f294517d7c259de48cc89ac87537424ddba1cc6c392f4b72b5179b9781e99c',
			'Cookie': '_intra_42_session_production=64faa32f79df99f4d4222d0f74f0bda4'
		}
	})
	.then(response => {
		setSearchResults(response.data);
	})
	.catch(error => {
		if (error.response.status === 404) {
      alert('User not found');
    }
	});
};