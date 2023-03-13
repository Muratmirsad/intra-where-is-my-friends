import axios from 'axios';

export const handleSearch = (searchQuery, setSearchResults) => {
	axios({
		method: 'get',
		maxBodyLength: Infinity,
		url: `https://api.intra.42.fr/v2/users/${searchQuery.toLowerCase()}`,
		headers: {
			'Authorization': 'Bearer 59b1f24312d914ea7df0fa75bc097cbc05c1063b04753a9d65d94ac97d746afc',
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
