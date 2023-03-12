import React, { useState } from 'react';

function refreshPageOnScroll() {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);
}

export default refreshPageOnScroll;
