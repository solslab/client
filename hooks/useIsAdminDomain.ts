'use client';

import { useEffect, useState } from 'react';

export const useIsAdminDomain = () => {
	const [isAdminDomain, setIsAdminDomain] = useState(false);

	useEffect(() => {
		const hostname = window.location.hostname;
        console.log(hostname);
		setIsAdminDomain(hostname.startsWith('admin.'));
	}, []);

	return isAdminDomain;
};
