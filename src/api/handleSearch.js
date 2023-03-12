import axios from 'axios';

export const handleSearch = (searchQuery, setSearchResults) => {
	axios({
		method: 'get',
		maxBodyLength: Infinity,
		url: `https://api.intra.42.fr/v2/users/${searchQuery.toLowerCase()}`,
		headers: {
			'Authorization': 'Bearer ada568d502e868a02d684f4f0a6fc60b8069da6288bbef8db9d9f9b00dff783a',
			'Cookie': '_intra_42_session_production=64faa32f79df99f4d4222d0f74f0bda4'
		}
	})
	.then(response => {
		setSearchResults(response.data);
	})
	.catch(error => {
		console.error(error);
		alert(error)
	});
};
