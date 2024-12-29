'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAdminDomain } from '@/hooks/useIsAdminDomain';

export default function AdminPage() {
	const router = useRouter();
	const basePath = useIsAdminDomain() ? '' : '/admin';

	useEffect(() => {
		router.push(`${basePath}/member`);
	}, [router]);

	return <></>;
}
