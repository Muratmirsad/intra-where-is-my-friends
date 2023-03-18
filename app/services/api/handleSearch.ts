import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleSearch = (searchQuery, setSearchResults) => {
	AsyncStorage.getItem('token')
		.then((token) => {
			axios({
				method: 'get',
				maxBodyLength: Infinity,
				url: `https://api.intra.42.fr/v2/users/${searchQuery.toLowerCase()}`,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Cookie': '_intra_42_session_production=64faa32f79df99f4d4222d0f74f0bda4'
				}
			})
				.then((response) => {
					setSearchResults(response.data);
				}
			)
				.catch((error) => {
					if(error.response.status === 401 || error.response.status === 421) {
						axios({
							method: 'post',
							maxBodyLength: Infinity,
							url: 'https://api.intra.42.fr/oauth/token',
							headers: { 
								'Content-Type': 'application/x-www-form-urlencoded', 
								'Cookie': '_intra_42_session_production=64faa32f79df99f4d4222d0f74f0bda4; _mkra_stck=76c872e3efb1aee4e241b156a75a27f2%3A1678887731.5510278'
							},
							data: {
								'grant_type': 'client_credentials',
								'client_id': 'u-s4t2ud-fc93c0a48e6379841e1b7029403f55a8172a88d793fb6bf3d61c2c2decacb787',
								'client_secret': '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' 
							}
						})
							.then((response) => {
								AsyncStorage.setItem('token', response.data.access_token);
								console.log("token refreshed");
								handleSearch(searchQuery, setSearchResults);
							}
						)
							.catch((error) => {
								alert("e1: \n" + error);
							}
						);
					} else {
						alert("User not found");
					}
				}
			);
		}
	)
	.catch((error) => {
		alert("e3: \n" + error);
	});
};