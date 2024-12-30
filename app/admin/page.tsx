'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';

export default function AdminPage() {
	const router = useRouter();
	const basePath = useIsAdminDomain() ? '' : '/admin';
	console.log(useIsAdminDomain())
	console.log(basePath);

	useEffect(() => {
		router.push(`${basePath}/member`);
	}, [router]);

	return <></>;
}
